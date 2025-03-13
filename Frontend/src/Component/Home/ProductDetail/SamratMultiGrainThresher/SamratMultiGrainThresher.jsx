import "./SamratMultiGrainThresher.css";

const SamratMultiGrainThresher = () => {
  return (
    <div className="product-detail-container">
      <h1 className="product-title">Samrat Multi Grain Thresher</h1>

      <div className="product-content">
        <img
          src="https://www.makwelindustries.com/wp-content/uploads/2013/04/pro2.jpg" // Add correct image URL
          alt="Samrat Multi Grain Thresher"
          className="product-image"
        />

        <div className="product-description">
          <h2 className="product-heading">Multi Crop Thresher / Side Shaft Thresher:</h2>
          <p className="product-text">
            The Multi Crop Thresher, also known as a side shaft thresher, is designed to handle a variety of grains and pulses.
            This machine can thresh crops like castor, soybean, maize, wheat, millet, mustard, pigeon pea, mung beans, peas, sunflower, fenugreek, cumin, coriander, and more.
          </p>

          <h3 className="product-subheading">Construction:</h3>
          <p className="product-text">
            The threshing rotor and blowers are mounted on different shafts, ensuring efficient operation.
            Required RPM is transferred via a belt and pulley drive from a tractor, motor, or engine.
            Two blowers—one for suction and one for fine cleaning—ensure clean grain output.
          </p>

          <h3 className="product-subheading">Operation:</h3>
          <p className="product-text">
            The crop is fed into the hopper, where the threshing rotor gently separates grains from covers.
            Chopped straws are ejected by powerful blowers, while smaller dust particles are removed by the refining fan.
          </p>

          <h3 className="product-subheading">Options:</h3>
          <ul className="product-list">
            <li className="product-list-item">Drive: Available with Tractor PTO, Diesel Engine, or Electric Motor.</li>
            <li className="product-list-item">Feeding: Simple or Auto Feeding Mechanism.</li>
            <li className="product-list-item">Auto Feeding ensures automatic crop suction for efficient threshing.</li>
          </ul>

          <h3 className="product-subheading">Special Features:</h3>
          <ul className="product-list">
            <li className="product-list-item">Back Side Blower: Keeps the operating area clean.</li>
            <li className="product-list-item">Adjustable Towing Hook: Allows flexibility for different tractors.</li>
            <li className="product-list-item">Fine Cleaning Blower: Ensures 100% clean grain output.</li>
            <li className="product-list-item">Wide Sieves: Extra space for fast and equal spreading of grains.</li>
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
                <th className="table-header">Castor</th>
                <th className="table-header">Mung Beans</th>
                <th className="table-header">Kidney Beans</th>
                <th className="table-header">Gram</th>
                <th className="table-header">Pigeon Pea</th>
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
                <td className="table-data">20</td>
                <td className="table-data">9</td>
                <td className="table-data">9</td>
                <td className="table-data">14</td>
                <td className="table-data">28</td>
              </tr>
              <tr className="table-row">
                <td className="table-data">2.5 Feet</td>
                <td className="table-data">14</td>
                <td className="table-data">28</td>
                <td className="table-data">36</td>
                <td className="table-data">5</td>
                <td className="table-data">9</td>
                <td className="table-data">24</td>
                <td className="table-data">11</td>
                <td className="table-data">11</td>
                <td className="table-data">16</td>
                <td className="table-data">32</td>
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

export default SamratMultiGrainThresher;
