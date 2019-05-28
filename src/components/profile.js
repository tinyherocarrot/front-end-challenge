import React, { Component } from "react"
import PropTypes from "prop-types"
import "./profile.css"

// Mobx
import { action, decorate } from "mobx"
import { observer } from "mobx-react"

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

class Profile extends Component {
  componentDidMount() {
    const {
      store: { profile },
      profile: defaultProfile
    } = this.props
    if (defaultProfile) {
      Object.keys(defaultProfile).forEach(field => {
        profile[field].value = defaultProfile[field]
      })
    }
  }

  handleInputChange = event => {
    const {
      target: { name, value }
    } = event
    const {
      store: { profile }
    } = this.props

    profile[name].value = value.trim()
  }

  handleFormSubmit = event => {
    event.preventDefault()

    const requiredFields = ["name", "gender", "email", "phone"]

    const {
      store: { profile, emptyFields, message }
    } = this.props

    requiredFields.forEach(field => {
      const isValid = !emptyFields.includes(field)
      profile[field].valid = isValid
    })

    if (emptyFields.length !== 0) {
      message.text = `${capitalizeFirstLetter(
        emptyFields.join(", ")
      )} can not be blank`
      message.status = "error"
    } else {
      message.text = `Form submitted!`
      message.status = "success"
      console.log({
        name: profile.name.value,
        gender: profile.gender.value,
        email: profile.email.value,
        phone: profile.phone.value
      })
    }
  }

  render() {
    const {
      store: { profile, message },
      name
    } = this.props
    return (
      <div className="app">
        <h1>{name}</h1>
        <form onSubmit={this.handleFormSubmit}>
          <label className="profile-form__row">
            Name:
            <ControlledInput
              valid={profile.name.valid}
              value={profile.name.value}
              name="name"
              type="text"
              onChange={this.handleInputChange}
            />
          </label>
          <label className="profile-form__row">
            Gender:
            <ControlledSelect
              valid={profile.gender.valid}
              value={profile.gender.value}
              name="gender"
              onChange={this.handleInputChange}>
              <option value="unspecified">Unspecified</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </ControlledSelect>
          </label>
          <label className="profile-form__row">
            Email:
            <ControlledInput
              valid={profile.email.valid}
              value={profile.email.value}
              name="email"
              type="text"
              onChange={this.handleInputChange}
            />
          </label>
          <label className="profile-form__row">
            Phone:
            <ControlledInput
              valid={profile.phone.valid}
              value={profile.phone.value}
              name="phone"
              type="text"
              onChange={this.handleInputChange}
            />
          </label>
          <div className="profile-form__row">
            <input
              type="submit"
              value="Save"
              onClick={e => this.handleFormSubmit(e)}
            />
          </div>
          <div className="profile-form__row">
            <span
              className={`profile-form__message ${
                message.status === "error"
                  ? "profile-form__message--invalid"
                  : ""
              }`}>
              {message.text}
            </span>
          </div>
        </form>
      </div>
    )
  }
}

const ControlledInput = ({ touched, valid, ...props }) => (
  <input
    className={`profile-form__field ${
      !valid ? "profile-form__field--invalid" : ""
    }`}
    {...props}
  />
)

const ControlledSelect = ({ touched, valid, children, ...props }) => (
  <select
    className={`profile-form__field profile-form__select ${
      !valid ? "profile-form__field--invalid" : ""
    }`}
    {...props}>
    {children}
  </select>
)

Profile.propTypes = {
  profile: PropTypes.shape({
    name: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired
  }),
  name: PropTypes.string.isRequired
}

decorate(Profile, {
  handleInputChange: action,
  handleFormSubmit: action
})

export default observer(Profile)
