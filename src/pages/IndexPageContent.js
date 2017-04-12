import React from 'react';
import connect from 'soya/lib/data/redux/connect';
import Form from 'soya/lib/data/redux/form/Form';
import FormSegment from 'soya/lib/data/redux/form/FormSegment';
import TodoSegment from '../segments/TodoSegment';

import {
  Header,
  InputText,
  Footer
} from '../components/atomic';
import {
  MainSection,
  TodoWrapper,
  FilterWrapper,
  FooterSection
} from '../components/compound/layout';

const FORM_ID = `todo_form`;

class IndexPageContent extends React.Component {

  constructor(props) {
      super(props);
      if(props.context) {
          this.todostore = props.context.store;
          this.form = new Form(this.props.context.store, FORM_ID);
      }
  }

  static getSegmentDependencies() {
    return [TodoSegment];
  }

  static subscribeQueries(props, subscribe) {
    subscribe(TodoSegment.id(),'todos','todo_list');
    subscribe(TodoSegment.id(),'filter_iscomplete','filter');
  }

  addInputToSegment(event){
    console.log("val is from indexpagecontent");
    console.log(event.target.value);
  }

  listenEnter(event){
    const form = this.form;
    const todostore = this.context.store;
    if (event.key === 'Enter') {
      const ACTION_CREATOR = TodoSegment.getActionCreator();

      const promise = todostore.query(FormSegment.id(), {
        formId: FORM_ID,
        type: 'field',
        fieldName: 'todo_input'
      }).then((retval) => {
        todostore
          .dispatch(ACTION_CREATOR.add(retval.value)).then(()=>{
            form.setValue('todo_input','');
          });
      });
    }
  }

  renderFooter(){
    if(this.props.result.todo_list != null && this.props.result.todo_list.length > 0){
      return (
        <Footer style="footer">
          <FooterSection context={this.props.context} />
        </Footer>
      );
    }else{
      return <div />
    }
  }

  render() {
    require('../../assets/base.css');
    require('../../assets/index.css');

    return(
      <div>
        <section className="todoapp">
          <Header text="Soya Todo">
            <InputText
              form={this.form}
              name="todo_input"
              type='new-todo'
              placeholder="what needs to be done ?"
              autofocus
              context={this.props.context}
              onInputChange={this.addInputToSegment}
              onKeyPressed={this.listenEnter}
            />
          </Header>

          <MainSection context={this.props.context}>
            <TodoWrapper
              context={this.props.context}
              form={this.form}
            />
          </MainSection>

          {this.renderFooter()}
        </section>
        <Footer style="info">
    			<p>Double-click to edit a todo</p>
    			<p>Created by <a href="http://fawwazmuhammad.com">Fawwaz Muhammad</a></p>
    			<p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    		</Footer>
      </div>
    );
  }
}

export default connect(IndexPageContent);
