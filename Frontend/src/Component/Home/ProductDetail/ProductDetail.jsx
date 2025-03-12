import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

const products = [
  {
    id: 1,
    name: "Maize/Corn Thresher",
    category: "Thresher",
    image: "https://www.makwelindustries.com/wp-content/uploads/2013/04/pro5.jpg",
    description: "A powerful and efficient maize/corn thresher designed for maximum productivity.",
    application: "To Remove maize seeds from the cobs by gentle shelling action without damaging maize/corn seeds. Empty Cobs will be collected from the back side of the thresher which comes out from the top of reciprocating sieve chamber.",
    operation: "As the plucked/collected cobs after removing its skin will be fed as a input from the feeding hopper. Threshing Bars made from En-8 hardened steel apply threshing action to separate corn seeds from the cobs and both of them along with the small dust generated from the threshing action passes through concave cutter made from 12mm Sq. Bars. As all this material falls on the reciprocating sieve chamber, small dust will be sucked and blown away by blowers, empty cobs can not pass perforated sieve so they will come out from the back side of the chamber and corn seeds passed through sieves and after cleaning action in four sieves they will be collected at collection outlet after blowing small impurities which may have passed through sieves along with corn seeds.",
    construction: [
      "Heavy gauge welded steel plates.",
      "Drum: Rasp bars made from hardened EN-8 material for longer life.",
      "Concave: Polish square steel bars for better threshing without damaging seeds.",
      "Aspiration: Precisely adjustable air flow with a high-performance fan.",
      "Undercarriage: Two large 6.00 X 18 tyres for easy movement."
    ],
    specifications: [
      { model: "2.0 feet", capacity: "3500 Kg", drive: "Tractor PTO, Engine, Diesel", wheelSize: "600 X 16 Tyres", drumWidth: "610 mm", dimensions: "H=2500mm, L=3000mm, W=1800mm" },
      { model: "2.5 Feet", capacity: "4000 Kg", drive: "Tractor PTO, Engine, Diesel", wheelSize: "600 X 16 Tyres", drumWidth: "762 mm", dimensions: "H=2500mm, L=3000mm, W=1800mm" }
    ]
  }
];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <h2 className="not-found">Product not found</h2>;
  }

  return (
    <div className="product-detail-container">
      {/* Top Section - Image & Information */}
      <div className="product-top">
        <img src={product.image} alt={product.name} className="detail-image" />
        <div className="product-info">
          <h2 className="product-title">{product.name}</h2>
          <p className="product-description">{product.description}</p>
          <h3>Application</h3>
          <p>{product.application}</p>
        </div>
      </div>

      {/* Bottom Section - Additional Details */}
      <div className="product-bottom">
        <h3>Operation</h3>
        <p>{product.operation}</p>

        <h3>Construction</h3>
        <ul>
          {product.construction.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <h3>Specifications</h3>
        <table className="specs-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Capacity</th>
              <th>Drive Options</th>
              <th>Wheel Size</th>
              <th>Drum Width</th>
              <th>Dimensions</th>
            </tr>
          </thead>
          <tbody>
            {product.specifications.map((spec, index) => (
              <tr key={index}>
                <td>{spec.model}</td>
                <td>{spec.capacity}</td>
                <td>{spec.drive}</td>
                <td>{spec.wheelSize}</td>
                <td>{spec.drumWidth}</td>
                <td>{spec.dimensions}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Buttons */}
        <div className="buttons">
          <button className="back-btn" onClick={() => navigate("/")}>
            Back to Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
