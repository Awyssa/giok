import { readFileSync, existsSync } from "fs";
import { join } from "path";

const componentsDir = join(process.cwd(), "components");
const componentCache = new Map();

function loadComponent(name) {
	if (componentCache.has(name)) {
		return componentCache.get(name);
	}
	const componentPath = join(componentsDir, `${name}.html`);
	if (!existsSync(componentPath)) {
		console.warn(`Component not found: ${name}`);
		return `<!-- Component ${name} not found -->`;
	}
	const content = readFileSync(componentPath, "utf-8");
	componentCache.set(name, content);
	return content;
}

export function processTemplate(html) {
	return html.replace(/\{\{component:(\w+)\}\}/g, (match, componentName) => {
		return loadComponent(componentName);
	});
}

export function clearComponentCache() {
	componentCache.clear();
}
