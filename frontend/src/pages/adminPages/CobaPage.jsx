import React from "react";

const TableTemplate = () => {
  const numCols = 20;
  const numRows = 100;

  // Buat header
  const headers = Array.from({ length: numCols }, (_, i) => (
    <th
      key={i}
      className="px-4 py-2 border bg-gray-200 sticky top-0 z-10 text-center whitespace-nowrap"
    >
      Header {i + 1}
    </th>
  ));

  // Buat body
  const rows = Array.from({ length: numRows }, (_, rowIndex) => (
    <tr key={rowIndex}>
      {Array.from({ length: numCols }, (_, colIndex) => (
        <td
          key={colIndex}
          className="px-4 py-2 border text-center whitespace-nowrap"
        >
          {rowIndex + 1}-{colIndex + 1}
        </td>
      ))}
    </tr>
  ));

  return (
    <div className="w-screen h-[50vh] p-4">
      <div className="w-full h-full border rounded shadow overflow-auto">
        <div className="inline-block min-w-max">
          <table className="table-auto border-collapse">
            <thead>{headers}</thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableTemplate;
