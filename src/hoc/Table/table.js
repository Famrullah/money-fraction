import React from 'react';
import './_table.scss';

const table = props => {
  const { idr, rest, list } = props;
  const renderList = () => {
    if (rest > 0) {
      return <div>Sisa Rp.{idr(rest)} tidak ada pecahan</div>;
    }
  };
  return (
    <div>
      {list.map((item, index) => {
        return (
          <div key={index} className="list-money">
            <div className="list-money__fraction"> {idr(item.fraction)}</div>
            <div className="list-money__sheet">{item.sheet} Lembar</div>
          </div>
        );
      })}
      <div className="error">{renderList()}</div>
    </div>
  );
};

export default table;
