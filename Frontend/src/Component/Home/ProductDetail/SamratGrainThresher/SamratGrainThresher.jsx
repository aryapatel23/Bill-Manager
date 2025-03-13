import "./SamratGrainThresher.css";

const SamratGrainThresher = () => {
  return (
    <div className="product-detail-container">
      <h1 className="product-title">Samrat Grain Thresher</h1>

      <div className="product-content">
        <img
          src="https://www.makwelindustries.com/wp-content/uploads/2013/04/pro1.jpg" // Add correct image URL
          alt="Samrat Grain Thresher"
          className="product-image"
        />

        <div className="product-description">
          <h2 className="product-heading">Samrat Grain Thresher:</h2>
          <p className="product-text">
            The Samrat Grain Thresher, also known as a single shaft thresher, is a **simple yet sturdy** machine designed for threshing crops such as wheat, millet, maize, mustard, cumin, fenugreek, pigeon pea, Isabgol (Psyllium), Rajgara, and more.
          </p>

          <h3 className="product-subheading">Construction:</h3>
          <p className="product-text">
            As the name **single shaft** suggests, the threshing rotor and blower fan are mounted on a single **solid shaft**, ensuring **equal RPM (speed)** for both components.
          </p>

          <h3 className="product-subheading">Operation:</h3>
          <p className="product-text">
            The crop is fed into the **feeding hopper**, where the **threshing rotor** gently separates grains from their covers.  
            The **reciprocating sieve chamber** ensures proper separation, while the **blower fan** ejects larger waste away from the working area.  
            Finally, the **refining fan** removes dust particles, ensuring clean grain output.
          </p>

          <h3 className="product-subheading">Options:</h3>
          <ul className="product-list">
            <li className="product-list-item">Drive: Available with **Tractor PTO, Diesel Engine, or Electric Motor**.</li>
            <li className="product-list-item">Feeding: **Simple Feeding Mechanism** or **Auto Feeding Mechanism**.</li>
          </ul>

          <h3 className="product-subheading">Special Features:</h3>
          <ul className="product-list">
            <li className="product-list-item">**Back Side Blower**: Keeps the working area clean and protects the tractor radiator.</li>
            <li className="product-list-item">**Adjustable Towing Hook**: Adjustable height for different tractor models.</li>
            <li className="product-list-item">**Fine Cleaning Blower**: Ensures **100% clean** grain output.</li>
            <li className="product-list-item">**Wide Sieves**: Faster processing and better grain separation.</li>
          </ul>

          <h3 className="product-subheading">Output Capacity per Hour:</h3>
          <table className="product-table">
            <thead className="table-head">
              <tr className="table-row">
                <th className="table-header">Model</th>
                <th className="table-header">Wheat</th>
                <th className="table-header">Millet</th>
                <th className="table-header">Maize</th>
                <th className="table-header">Cumin</th>
                <th className="table-header">Mustard</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr className="table-row">
                <td className="table-data">2 Feet</td>
                <td className="table-data">10</td>
                <td className="table-data">20</td>
                <td className="table-data">32</td>
                <td className="table-data">3</td>
                <td className="table-data">7</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">2.5 Feet</td>
                <td className="table-data">14</td>
                <td className="table-data">28</td>
                <td className="table-data">36</td>
                <td className="table-data">5</td>
                <td className="table-data">9</td>
              </tr>
            </tbody>
          </table>

          <h3 className="product-subheading">Specifications:</h3>
          <table className="product-table">
            <thead className="table-head">
              <tr className="table-row">
                <th className="table-header">Model</th>
                <th className="table-header">Drive Options</th>
                <th className="table-header">Wheel Size</th>
                <th className="table-header">Drum Width</th>
                <th className="table-header">Dimensions (H x L x W)</th>
                <th className="table-header">Weight</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr className="table-row">
                <td className="table-data">2.0 Feet</td>
                <td className="table-data">Tractor PTO / Engine / Diesel</td>
                <td className="table-data">600 X 16 Tyres</td>
                <td className="table-data">610 mm</td>
                <td className="table-data">2500mm x 3000mm x 1800mm</td>
                <td className="table-data">1100 Kg</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">2.5 Feet</td>
                <td className="table-data">Tractor PTO / Engine / Diesel</td>
                <td className="table-data">600 X 16 Tyres</td>
                <td className="table-data">762 mm</td>
                <td className="table-data">2500mm x 3000mm x 1800mm</td>
                <td className="table-data">1300 Kg</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SamratGrainThresher;
