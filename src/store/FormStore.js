import { observable, computed, decorate } from "mobx"

class FormStore {
  message = {
    text: "",
    status: ""
  }
  profile = {
    name: { value: "", valid: true },
    gender: { value: "", valid: true },
    email: { value: "", valid: true },
    phone: { value: "", valid: true }
  }

  get emptyFields() {
    return Object.keys(this.profile).filter(
      field => this.profile[field].value.length === 0
    )
  }
}

decorate(FormStore, {
  message: observable,
  profile: observable,
  emptyFields: computed
})

export default FormStore
