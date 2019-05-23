import { observable, computed, autorun, decorate } from "mobx";

export default class FormStore {
  profile = {
    name: "",
    gender: "",
    email: "",
    password: ""
  }

  constructor() {
    autorun(() => console.log(this.profile))
  }
  
  get getEmptyFields() {
    const emptyFields = this.profile.keys().filter(field => this.profile[field] === "");
    return emptyFields || null;
  } 

}

decorate(FormStore, {
  profile: observable,
  getEmptyFields: computed
});