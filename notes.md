# Front End Challenge

### Step 1 Setup MobX Store

- **Motivation**: Introduce MobX state management for easier form control.
- Installed `mobx` and `mobx-react`
- Created `/store`, `FormStore.js`.
- Imported at `index.js`, initialized, and passed to New and Edit.
- Edited `New` and `Edit` components to pass down the store to `Profile` component.

### Step 2 Convert to Controlled Inputs

- **Motivation**: Ability to do client side feedback/validation. Also, input's onChange can be debounced for performance.
- Added a `value` prop to each input element, set to `store.profile.<field>`
- Deleted `defaultValue` prop on each input.
- Added new `handleInputChange` handler to each input.
- Pass new `handleFormSubmit` method to the save button, remove old one from form element.

### Step 3 Rewrite Feedback/Validation logic

- **Motivation**: Remove use of refs, ie. in the feedback message. 
- Rewrote `handleFormSubmit`. New `handleFormSubmit` checks `requiredFields` array against computed `emptyFields` array from the FormStore. If matches are found, the field's `valid` property is changed to `false` in the FormStore. This causes the corresponding input to style with a red border. A message is joined from `emptyFields` array. Else show "Form Submitted!"
- Kept the requiredFields array. Makes it easy to later turn that into a prop to be passed into Profile.js.

### Step 4 Cleanup

- **Motivation**: Smaller and DRYer components make devs happy!
- Used ES6 destructuring wherever possible.
- Removed Profile constructor method. No more need for ref. No more need for binding (since methods are now bound with arrow notation).
- Removed defaultProps, since profile default is now loaded from the MobX store if not passed in.
- Created `ControlledInput` and `ControlledSelect` components to DRY up "dynamic" className logic.


## Future Steps:

- More DRY code. eg. move label into Input components? Not sure if that is good practice
- Include mobx store in Profile.propTypes?
- Toggling classNames to affect the styles (of inputs, feedback message) seems messy. Explore more solutions to dynamic styling. CSS-in-JS solutions?
- Form inputs seems laggy. Debounce `handleInputChange`?
- Should validation happen on input change?
- Write out test cases: 

1. (test New profile and Edit Profile) Submitting non-empty fields should result in no style changes inputs, and "Form Submitted!" message
2. (test New profile and Edit Profile) Submitting unfilled form should result error (red) message and red borders around the corresponding empty input fields
3. Test Mobx Store: Test that inputs to New profile produce expected changes to profile in FormStore. Test that Edit profile produces expected values in profile in FormStore