import "./SamratGroundNutDigger.css";

const SamratGroundNutDigger = () => {
  return (
    <div className="product-detail-container">
      <h1 className="product-title">Samrat Ground Nut Digger</h1>

      <div className="product-content">
        <img
          src="https://www.makwelindustries.com/wp-content/uploads/2013/04/pro6.jpg" // Replace with actual image URL
          alt="Samrat Ground Nut Digger"
          className="product-image"
        />

        <div className="product-description">
          <h2 className="product-heading">Application:</h2>
          <p className="product-text">
            The **Tractor Mounted Samrat Ground Nut Digger** is designed to **dig, lift, shake, and windrow** groundnuts in a single operation, ensuring almost **zero loss** of groundnuts underground.
          </p>

          <h3 className="product-subheading">Construction & Operation:</h3>
          <p className="product-text">
            This **heavy-duty machine** is engineered for long service life.  
            The **V-shaped blades**, made from **spring steel**, cut under the groundnut crop, lifting the plants along with the soil.  
            The **elevator mechanism** separates the soil while the **dirt knocker wheels** shake off excess dirt, ensuring clean harvesting.  
            The final crop is **windrowed at the center**, ready for sun drying.
          </p>

          <h3 className="product-subheading">Adjustability:</h3>
          <ul className="product-list">
            <li className="product-list-item">
              **Plough Blades:** Adjustable for different **row spacing**.
            </li>
            <li className="product-list-item">
              **Back Wheels:** Raise/lower for **depth control**.
            </li>
            <li className="product-list-item">
              **Elevator Pick-up:** Adjustable via **chain linkage**.
            </li>
          </ul>

          <h3 className="product-subheading">Specifications:</h3>
          <table className="product-table">
            <thead className="table-head">
              <tr className="table-row">
                <th className="table-header">No. of Rows</th>
                <th className="table-header">Drive Requirement</th>
                <th className="table-header">Blades</th>
                <th className="table-header">Dirt Knocker</th>
                <th className="table-header">Back Side Wheels</th>
                <th className="table-header">Weight</th>
                <th className="table-header">Packing (Wooden Box)</th>
              </tr>
            </thead>
            <tbody className="table-body">
              <tr className="table-row">
                <td className="table-data">2 Nos.</td>
                <td className="table-data">Tractor Drive (HP 45+)</td>
                <td className="table-data">V Type (Spring Steel)</td>
                <td className="table-data">2 Nos.</td>
                <td className="table-data">Adjustable (Dia-420mm, Width-100mm)</td>
                <td className="table-data">470 KG</td>
                <td className="table-data">L – 7.5 Feet, W – 7.5 Feet, H – 4.0 Feet</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SamratGroundNutDigger;
