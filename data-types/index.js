class String {
  constructor(value) {
    if (value === null || value === undefined) {
      throw new TypeError("String value cannot be null or undefined");
    }

    this.value = value;
  }

  toString() {
    return this.value;
  }
}
