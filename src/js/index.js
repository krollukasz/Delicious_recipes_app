import Search from "./models/Search";
import "../sass/style.scss";

const search = new Search("pizza");
console.log(search);
search.getResults();
console.log("My app !!");