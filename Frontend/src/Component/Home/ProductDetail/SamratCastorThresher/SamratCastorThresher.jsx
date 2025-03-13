import "./SamratCastorThresher.css";

const SamratCastorThresher = () => {
  return (
    <div className="product-detail-container">
      <h1 className="product-title">Samrat Castor Thresher</h1>
      
      <div className="product-content">
        <img 
          src="https://www.makwelindustries.com/wp-content/uploads/2013/04/pro4.jpg" 
          alt="Samrat Castor Thresher" 
          className="product-image"
        />

        <div className="product-description">
          <h2 className="product-heading">CASTOR THRESHER :</h2>
          <ul className="product-list">
            <li className="product-list-item">Outstanding Castor Threshing Performance.</li>
            <li className="product-list-item">Very easy to operate and almost maintenance-free.</li>
            <li className="product-list-item">Easy movement in the fields and on the road with 6.00 X 16 tyres.</li>
            <li className="product-list-item">Suitable for threshing different sizes of castor pods.</li>
            <li className="product-list-item">Available drive options: Tractor, Electric Motor & Diesel Engine.</li>
          </ul>

          <h3 className="product-subheading">Application:</h3>
          <p className="product-text">
            To remove the outer cover of castor pods and separate castor seeds without damaging them.
            Covers are blown away by a powerful blower, and castor seeds are collected efficiently.
          </p>

          <h3 className="product-subheading">Operation:</h3>
          <p className="product-text">
            Castor pods are fed into the specially designed feeding hopper. Inside the threshing chamber,
            shelling flats apply gentle pressure, breaking the seed cover. Castor seeds and covers move toward 
            the reciprocating sieve chamber, where a powerful blower separates the lighter covers from the seeds.
            Fully shelled seeds pass through sieves, while semi-shelled seeds are collected separately for re-threshing.
          </p>

          <h3 className="product-subheading">Construction:</h3>
          <ul className="product-list">
            <li className="product-list-item">Body: Heavy gauge welded steel plates.</li>
            <li className="product-list-item">Drum: Rasp bars made from hardened EN-8 material.</li>
            <li className="product-list-item">Concave: Made from polished square steel bars for gentle threshing.</li>
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

export default SamratCastorThresher;
