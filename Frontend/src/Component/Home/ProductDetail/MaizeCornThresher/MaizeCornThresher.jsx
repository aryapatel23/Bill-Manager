import "./MaizeCornThresher.css";

const MaizeCornThresher = () => {
  return (
    <div className="product-detail-container">
      <h1 className="product-title">Maize/Corn Thresher</h1>
      
      <div className="product-content">
        <img 
          src="https://www.makwelindustries.com/wp-content/uploads/2013/04/pro5.jpg" 
          alt="Maize/Corn Thresher" 
          className="product-image"
        />

        <div className="product-description">
          <h2 className="product-heading">MAIZE/CORN THRESHER :</h2>
          <ul className="product-list">
            <li className="product-list-item">Gentle Maize/Corn Shelling Operation.</li>
            <li className="product-list-item">Very Easy To Operate and almost maintenance-free.</li>
            <li className="product-list-item">Easy movement in the fields and on the road with 6.00 X 16 tyres.</li>
            <li className="product-list-item">Suitable for threshing different sizes of castor pods.</li>
            <li className="product-list-item">Different Drive options available: Tractor, Electric Motor & Diesel Engine.</li>
          </ul>

          <h3 className="product-subheading">Application:</h3>
          <p className="product-text">
            To remove maize seeds from the cobs by gentle shelling action without damaging maize/corn seeds. 
            Empty cobs will be collected from the back side of the thresher.
          </p>

          <h3 className="product-subheading">Operation:</h3>
          <p className="product-text">
            Cobs are fed into the machine via the feeding hopper. The threshing bars, made from hardened EN-8 steel, 
            apply a threshing action to separate corn seeds from the cobs. The system uses a reciprocating sieve chamber 
            to separate dust, empty cobs, and seeds effectively.
          </p>

          <h3 className="product-subheading">Construction:</h3>
          <ul className="product-list">
            <li className="product-list-item">Body: Heavy gauge welded steel plates.</li>
            <li className="product-list-item">Drum: Rasp bars made from hardened EN-8 material.</li>
            <li className="product-list-item">Concave: Made from polished square steel bars for better threshing.</li>
            <li className="product-list-item">Aspiration: Adjustable airflow with a high-performance fan.</li>
            <li className="product-list-item">Undercarriage: Two large 6.00 X 16 tyres for easy movement.</li>
          </ul>

          <h3 className="product-subheading">Specifications:</h3>
          <table className="product-table">
            <thead className="table-head">
              <tr className="table-row">
                <th className="table-header">Model</th>
                <th className="table-header">Capacity</th>
                <th className="table-header">Drive Options</th>
                <th className="table-header">Wheel Size</th>
                <th className="table-header">Drum Width</th>
                <th className="table-header">Dimensions (H x L x W)</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr className="table-row">
                <td className="table-data">2.0 Feet</td>
                <td className="table-data">3500 Kg</td>
                <td className="table-data">Tractor PTO / Engine / Diesel Engine</td>
                <td className="table-data">600 X 16 Tyres</td>
                <td className="table-data">610 mm</td>
                <td className="table-data">2500mm x 3000mm x 1800mm</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">2.5 Feet</td>
                <td className="table-data">4000 Kg</td>
                <td className="table-data">Tractor PTO / Engine / Diesel Engine</td>
                <td className="table-data">600 X 16 Tyres</td>
                <td className="table-data">762 mm</td>
                <td className="table-data">2500mm x 3000mm x 1800mm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MaizeCornThresher;
