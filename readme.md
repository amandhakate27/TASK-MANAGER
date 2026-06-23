# JavaScript Concepts Study Guide

This README explains how the browser works behind the scenes and how JavaScript events move through elements.

Live Demo: [task-manager-ashy-chi.vercel.app](https://task-manager-ashy-chi.vercel.app/)

This project is part of the Sheryians Coding School assignment.

## Parsing

### Definition
Parsing is the process of reading HTML and understanding what each part of the document means.

### Simple Explanation
The browser reads the HTML line by line and figures out the structure of the page.

### Example
```html
<html>
	<body>
		<h1>Hello</h1>
	</body>
</html>
```

The browser parses this and understands that the page has an `h1` inside the `body`.

## Tokenization

### Definition
Tokenization is the step where the browser breaks HTML into small pieces called tokens.

### Simple Explanation
The browser turns raw HTML into parts like tags and text so it can process them easily.

### Example
```html
<h1>Hello</h1>
```

This becomes tokens like:

- Opening tag: `<h1>`
- Text: `Hello`
- Closing tag: `</h1>`

## DOM Tree

### Definition
The DOM tree is a tree structure made from the HTML document.

### Simple Explanation
Each HTML element becomes a node, and the browser connects them like a family tree.

### Example
```html
<html>
	<body>
		<h1>Hello</h1>
	</body>
</html>
```

This can look like:

```text
html
└── body
		└── h1
```

## CSSOM Tree

### Definition
The CSSOM tree is the browser's internal tree for CSS rules.

### Simple Explanation
The browser reads CSS and stores style information in a structured form.

### Example
```css
h1 {
	color: red;
	font-size: 32px;
}
```

The browser converts these rules into the CSSOM so it can apply them to elements.

## Render Tree

### Definition
The render tree is created by combining the DOM tree and CSSOM tree.

### Simple Explanation
The browser joins structure and style together to decide what should actually be shown on screen.

### Example
```html
<body>
	<h1>Hello</h1>
	<p style="display:none">Hidden text</p>
</body>
```

Only visible elements are included in the render tree.

## Event Bubbling

### Definition
Event bubbling is the default event flow where the event starts from the clicked element and moves upward to its parent elements.

### Simple Explanation
If you click a child element, first the child handler runs, then the parent, then the grandparent.

### Example
```html
<div id="grandparent">
	<div id="parent">
		<button id="child">Click</button>
	</div>
</div>

<script>
document.getElementById('child').addEventListener('click', () => console.log('Child'));
document.getElementById('parent').addEventListener('click', () => console.log('Parent'));
document.getElementById('grandparent').addEventListener('click', () => console.log('Grandparent'));
</script>
```

Clicking the button logs:

```text
Child
Parent
Grandparent
```

## Event Capturing

### Definition
Event capturing is the phase where the event travels from the outermost parent down to the target element.

### Simple Explanation
The browser first checks the grandparent, then the parent, and finally the child.

### Example
```html
<div id="grandparent">
	<div id="parent">
		<button id="child">Click</button>
	</div>
</div>

<script>
document.getElementById('grandparent').addEventListener('click', () => console.log('Grandparent'), true);
document.getElementById('parent').addEventListener('click', () => console.log('Parent'), true);
document.getElementById('child').addEventListener('click', () => console.log('Child'), true);
</script>
```

Clicking the button logs:

```text
Grandparent
Parent
Child
```

## Event Delegation

### Definition
Event delegation is a way of attaching one event listener to a parent and handling child events through it.

### Simple Explanation
Instead of adding a separate listener to every child, you add one listener to the parent.

### Example
```html
<ul id="todo-list">
	<li>Task 1</li>
	<li>Task 2</li>
	<li>Task 3</li>
</ul>

<script>
document.getElementById('todo-list').addEventListener('click', (event) => {
	if (event.target.tagName === 'LI') {
		console.log('Clicked:', event.target.textContent);
	}
});
</script>
```
