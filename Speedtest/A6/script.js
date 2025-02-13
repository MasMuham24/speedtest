class Csv {
  options = {
    delimiter: ",",
    lineBreak: "\n",
    noHeaders: false,
    headers: [],
  };

  constructor(options) {
    if (options) {
      this.options = Object.assign({}, this.options, options);
    }
  }

  delimiter = (delimiter) => {
    const that = clone(this);
    that.options.delimiter = delimiter || this.options.delimiter;
    return that;
  };

  lineBreak = (lineBreak) => {
    const that = clone(this);
    that.options.lineBreak = lineBreak || this.options.lineBreak;
    return that;
  };

  noHeaders = (noHeaders) => {
    const that = clone(this);
    that.options.noHeaders = noHeaders === undefined || noHeaders;
    return that;
  };

  headers = (headers) => {
    const that = clone(this);
    that.options.headers = headers || this.options.headers;
    return that;
  };

  parseData = (data) => {
    const arr = String(data).split(this.options.lineBreak);

    if (!data || arr.length === 1) {
      return arr;
    }

    const jsObject = [];
    let headers = [];
    let skipFirstLine = false;

    if (this.options.headers.length > 0) {
      headers = this.options.headers;
      const fieldList = arr[0].split(this.options.delimiter);

      if (!this.options.noHeaders && headers.length < fieldList.length) {
        const tail = fieldList.slice(headers.length);
        headers = headers.concat(tail);
        skipFirstLine = true;
      }
    } else {
      const fieldList = arr[0].split(this.options.delimiter);

      if (this.options.noHeaders) {
        headers = Array(fieldList.length)
          .fill()
          .map((_, index) => "Field" + index);
      } else {
        headers = fieldList;
        skipFirstLine = true;
      }
    }

    for (let i = 0; i < arr.length; i++) {
      if (i === 0 && skipFirstLine) continue;

      const data = arr[i].split(this.options.delimiter);
      const obj = {};

      for (let j = 0; j < data.length; j++) {
        obj[headers[j]] = data[j].trim();
      }
      jsObject.push(obj);
    }

    return jsObject;
  };
}

const clone = (something) => {
  return new Csv(something.options);
};

document.getElementById("convertButton").addEventListener("click", () => {
  const csvInput = document.getElementById("csvInput").value;
  const csv = new Csv();
  const jsonOutput = csv.parseData(csvInput);
  document.getElementById("jsonOutput").textContent = JSON.stringify(
    jsonOutput,
    null,
    2
  );
});
