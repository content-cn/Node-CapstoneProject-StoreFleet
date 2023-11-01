export class Apifeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
    console.log(queryString);
  }

  search() {
    const keyword = this.queryString.keyword
      ? { name: { $regex: this.queryString.keyword, $options: "i" } }
      : {};
    this.query = this.query.find({ ...keyword });
    return this;
  }

  // filter() {
  //   const removeKeysFromQueryStr = ["keyword", "page", "limit"];
  //   let copyQueryString = { ...this.queryString };
  //   removeKeysFromQueryStr.forEach((key) => {
  //     delete copyQueryString[key];
  //   });

  //   // filter for price  and rating
  //   let queryStr = JSON.stringify(copyQueryString);
  //   queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=>`$${key}`)
  //   console.log(queryStr);

  //   this.query = this.query.find(copyQueryString);
  //   return this;
  // }
  filter() {
    const removeKeysFromQueryStr = ["keyword", "page", "limit"];
    let copyQueryString = { ...this.queryString };
    removeKeysFromQueryStr.forEach((key) => {
      delete copyQueryString[key];
    });

    // filter for price  and rating
    let queryStr = JSON.stringify(copyQueryString);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));
    return this;
  }

  pagination = (resultPerPage) => {
    const currentPage = this.queryString.page || 1;
    const documentToSkip = (currentPage - 1) * resultPerPage;
    this.query = this.query.limit(resultPerPage).skip(documentToSkip);
    return this;
  };
}
