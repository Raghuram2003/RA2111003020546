import { useState } from "react";
import axios from "axios";

function App() {
  const [category, setCategory] = useState("");
  const [company, setCompany] = useState("");
  const [top, setTop] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [response, setResponse] = useState(null);

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      const res = await axios.get(
        `/api/categories/${category}/products?top=${top}&company=${company}&minprice=${minPrice}&maxprice=${maxPrice}`
      );
      setResponse(res.data)
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="bg-slate-200">
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          placeholder="category"
          onChange={(e) => setCategory(e.target.value)}
        />
        <input
          placeholder="company"
          onChange={(e) => setCompany(e.target.value)}
        />
        <input placeholder="top" onChange={(e) => setTop(e.target.value)} />
        <input
          placeholder="Minimum Price"
          onChange={(e) => setMinPrice(e.target.value)}
        />
        <input
          placeholder="Maximum Price"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
        <button>Submit</button>
      </form>
      <div className="flex items-center justify-center ">
        <div className="flex  flex-col items-center justify-center w-1/2 overflow-x-auto">
          {response !== null &&
            response.length > 0 &&
            response.map((data, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center justify-center border border-white w-full m-2"
              >
                <div className="p-2 bg-slate-600 rounded-full m-2 text-white">
                  Name : {data.productName}
                </div>
                <div className="p-2 bg-slate-600 rounded-full m-2 text-white">
                  Price : {data.price}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default App;
