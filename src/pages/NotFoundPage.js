import React from 'react';
import register from 'soya/lib/client/Register';
import Page from 'soya/lib/page/Page';
import RenderResult from 'soya/lib/page/RenderResult';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';

class NotFoundPage extends Page {

  static get pageName() {
    return 'todoPage';
  }
  /**
   * Page title
   *
   * @returns {string}
   */
   get pageTitle() {
    return 'Not Found';
  }

  /**
   * Page content
   *
   * @returns {*}
   */
   get pageContent() {
    return React.createClass({
      render() {
        return <div> Not Found </div>
      }
    })
  }

  renderContent(httpRequest, routeArgs, store, callback) {
    const reactRenderer = new ReactRenderer();
    const context = this.createContext(store);

    reactRenderer.head = `<title> Todo List </title>`;
    reactRenderer.body = React.createElement(this.pageContent, {
      context : {
        ...context,
        routeArgs,
        httpRequest
      }
    });

    const renderResult = new RenderResult(reactRenderer);
    callback(renderResult);
  }

  render(httpRequest, routeArgs, store, callback) {
    const filters = this.filters || [];
    let filterFailureHandler = null;
    for (let i = 0; i < filters.length; i++) {
      if (filterFailureHandler !== null)
        break;

      if (!filters[i].onFilter(httpRequest, routeArgs, store, this.config, this.cookieJar))
        filterFailureHandler = filters[i].onFailed;
    }

    if (filterFailureHandler !== null) {
      filterFailureHandler(httpRequest, routeArgs, store, callback);
    } else {
      this.renderContent(httpRequest, routeArgs, store, callback);
    }
  }
}

register(NotFoundPage);

export default NotFoundPage;