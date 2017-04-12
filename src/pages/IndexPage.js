import React from 'react';
import register from 'soya/lib/client/Register';
import Page from 'soya/lib/page/Page';
import ReduxPage from 'soya/lib/page/ReduxPage';
import RenderResult from 'soya/lib/page/RenderResult';
import ReactRenderer from 'soya/lib/page/react/ReactRenderer';
import IndexPageContent from './IndexPageContent';

class IndexPage extends ReduxPage{
	static get pageName() {
		return 'todoPage';
	}

	get pageTitle() {
		return 'Todo Title'
	}

	get pageContent() {
		return IndexPageContent;
	}

	renderContent(httpRequest, routeArgs, store, callback) {
		console.log(config);
		const reactRenderer = new ReactRenderer();
		const context = this.createContext(store);
		const config = context.config;
		console.log(config);
		reactRenderer.head = `<meta charset="utf-8">
			<meta name="viewport" content="width=device-width, initial-scale=1">
			<link rel="stylesheet" type="text/css" href="${config.url.internalApi}/assets/base.css"/>
			<link rel="stylesheet" type="text/css" href="${config.url.internalApi}/assets/index.css"/>
			<title>Template • TodoMVC</title>`;
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

register(IndexPage);

export default IndexPage;
