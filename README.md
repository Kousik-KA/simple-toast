# Simple Toast JS

Simple Toast JS is a lightweight and customizable JavaScript library for creating toast messages in web applications. It can be used with any frontend framework or library, such as React, Angular, and Vue.

## Installation

To install Simple Toast JS using npm, run the following command:

```bash
npm install simple-toast-js
```

## Usage

To use Simple Toast JS, import it into your JavaScript file:

```javascript
import SimpleToast from "simple-toast-js";
```

Import the CSS stylesheet to include Simple Toast JS styles:

```javascript
import "simple-toast-js/styles/toast.css";
```

## Code Example

Here's an example of how to use Simple Toast JS:

```javascript
import SimpleToast from "simple-toast-js";
import "simple-toast-js/styles/toast.css";

const showToast = () => {
  new SimpleToast({
    position: "top-right",
    autoClose: 5000,
    closeOnClick: true,
    showProgressBar: true,
    pauseOnHover: false,
    type: "success",
  });
};

<button onclick="showToast()">Show Toast</button>;
```

## Options

When creating a toast message, you need to pass an `Options` object with the following keys:

| key             | type              | default     | values                                                                                         |
| --------------- | ----------------- | ----------- | ---------------------------------------------------------------------------------------------- |
| animation       | string            | 'shrink'    | 'shrink', 'slide'                                                                              |
| autoClose       | number \| boolean | 5000        |                                                                                                |
| closeOnClick    | boolean           | true        | true, false                                                                                    |
| message         | string            | ''          |                                                                                                |
| onClose         | function          | ()=>{}      |                                                                                                |
| pauseOnHover    | boolean           | false       | true, false                                                                                    |
| position        | string            | 'top-right' | 'top-left', 'top-right', 'top-center', bottom-left', 'bottom-right', 'bottom-center', 'center' |
| showProgressBar | boolean           | true        | true, false                                                                                    |
| styleToast      | object            | {}          | {width: '500px', color: 'white', and so on... }                                                |
| theme           | string            | 'light'     | 'light', 'dark', 'colored'                                                                     |
| type            | string            | 'default'   | 'default', 'info', 'success', 'warning', 'error'                                               |

## Methods

The following methods are available on the toast object:

```javascript
    const toast new SimpleToast({
            message: "A simple test toast!"
            position: "top-right",
            autoClose: 5000,
            closeOnClick: true,
            showProgressBar: true,
            pauseOnHover: false,
            type: "success",
        });

```

- ##### update()

  ```javascript
  toast.update({
    ...updatedOptionsObj,
  });
  ```

- ##### remove()

  ```javascript
  toast.remove();
  ```

## License

Simple Toast JS is licensed under the MIT License. See the LICENSE file for more information.
