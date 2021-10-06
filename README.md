# React Awesome Toasts

Easily customizable React notification system that manages its queue for you. 

<!-- TODO: create own demo page -->
https://blvdmitry.github.io/react-awesome-toasts/

- 🎙 Screen reader accessibility
- 🔧 Server side rendering support
- 📱 Responsive
- 📘 Typescript support
- 📦 React is the only dependency
- 🎉 5kb gzipped

### Get started

Install the package:

```sh
npm install react-awesome-toasts
// or
yarn add react-awesome-toasts
```

Wrap your app with `ToastProvider`:

```tsx
import { ToastProvider } from 'react-awesome-toasts'

const App = () => (
	<ToastProvider>
		App content
	</ToastProvider>
)
```

The main idea is that you get a dispatch function (see [Hooks API reference - useReducer](https://reactjs.org/docs/hooks-reference.html#usereducer) or [understanding useReducer](https://alligator.io/react/usereducer/)) using which you can trigger events such as showing toasts and removing toasts.

Instead of the dispatch function you can also use (very simple and basic) helper functions which make the usage a bit more easy and enjoyable.


Add toast methods to your component with one of the following methods:

*With High Order Component and dispatch function:*
 
```tsx
import { with_toast } from 'react-awesome-toasts'

const ToastButton = ({ dispatch }) => {
	const toast_props = {
		text: 'Message sent',
		action_text: 'Undo',
		aria_label: 'Message sent, click to undo',
		on_action_click: id => dispatch({ type: 'remove', payload: id }),
	}
	
	return <Button onClick={() => dispatch({ type: 'show', payload: toast_props })}>Show toast</Button>
}

export default with_toast(ToastButton)
```

*With High Order Component and helper function:*
 
```tsx
import { with_toast } from 'react-awesome-toasts'
import { show_toast, close_toast } from 'react-awesome-toasts'

const ToastButton = ({ dispatch }) => {
	const toast_props = {
		text: 'Message sent',
		action_text: 'Undo',
		aria_label: 'Message sent, click to undo',
		on_action_click: close_toast(dispatch)
	}
	
	// the default for on_action_click is dismissing/closing the toast, so it could be left out in this case
	return <Button onClick={() => show_toast(dispatch, toast_props)}>Show toast</Button>
}

export default with_toast(ToastButton)
```

*With ToastConsumer:*

```tsx
import { ToastConsumer } from 'react-awesome-toasts'
import { show_toast, close_toast } from 'react-awesome-toasts'

const toast_props = {
	text: 'Message sent',
	action_text: 'Undo',
	aria_label: 'Message sent, click to undo',
}

const SomeComponent = () => (
	<ToastConsumer>
		{(dispatch: ToastContext) => (
			<Button onClick={() => show_toast({ ...toast_props, on_action_click: close_toast })}>
				Show toast
			</Button>    
		)}
	</ToastConsumer>
)
```

You can also use the `show_simple_toast` and `show_full_toast`.
- `show_simple_toast` assumes `on_action_click` wants to close the toast and that `text` and `aria_label` are the same.
- `show_full_toast` makes use of the ability to pass not only strings but also react elements as the `text`-property, it replaces newlines with `<br />`'s, assumes `on_action_click` wants to close the toast and allows specifying a variant of toast to show.

### Allowed events

> Not all of these are necessarily useful; `"hide"` and `"remove"` are used for animations (hide called when animation has started; remove when the animation has finished)

**`"show"`**: Show a toast (or queue it when others are already being shown), takes the toast props you've seen above as payload.

**`"remove-and-queue"`**: Remove the current toast and queue potentially waiting toasts, takes the id of the toast to remove as payload.

`"remove"`: Just remove the current toast without interacting with the queue (*used internally as hide already queues new toasts*)

`"hide"`: Queue a potentially waiting toast (*used internally when the hiding animation starts*)

### Presentational Toast component

By default `ToastProvider` uses `Toast` component provided by the library.
`Toast` component is responsible for the accessibility and responsiveness of notifications.
Keep in mind, that if your replace it with your custom component - you will have to handle both of these features in your component if you need them in your app.

Default `Toast` component has follow properties:

| Property                                          | Description                        |
| ------------------------------------------------- | ---------------------------------- |
| text `string` or `(string | Element)[]`, required | Message to display in notification |
| action_text `string`                              | Text of the action button          |
| on_action_click `(id: string) => any`             | Action button click handler        |
| aria_label `string`                               | Default: `text` property value. Should be used for better accessibility. If `text` is not a string this property is required |
| variant `"error"`                                 | Variant of message                 |

### Accessibility

Default presentational `Toast` component provides accessibility features:

- When toast is opened, action button gets focused if its present
- When toast is hidden, previous focus is restored
- When toast is shown, screen reader reads its message or `ariaLabel` value. Since action button gets focused automatically - it's nice to have an aria-label that mentions it, e.g. `Item deleted, click to undo.  

### Customization

`ToastProvider` accepts properties for customizing the behaviour of the notifications.

| Property         | Description                                                            |
| ---------------- | ---------------------------------------------------------------------- |
| timeout `number` | Default: `4500`. The time until a toast is dismissed, in milliseconds. |
| component        | Presentational component for displaying notifications.                 |
| position `top-right, bottom-right, top-left, bottom-left, top-center, bottom-center` | Default: `bottom-left`. Position of the toasts on the screen. |

### Roadmap

<!-- TODO: tackle some of these issues (no hide animation, custom container class) -->
- Improve accessibility for focused toast actions
- Check colors AA accessibility level
- Let toasts hide without animation
- Custom container classnames
