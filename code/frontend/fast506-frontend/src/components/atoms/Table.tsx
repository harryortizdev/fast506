import React from "react";

interface TableRow {
  concepto: string;
  monto: string;
}

interface TableProps {
  rows: TableRow[];
}

const Table = ({ rows }: TableProps) => {
  return (
    <table className="table table-sm table-borderless mb-0">
      <thead>
        <tr style={{ backgroundColor: "#A9B4C2" }}>
          <th>Concepto</th>
          <th className="text-end">Monto</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, index) => (
          <tr
            key={index}
            className={index === rows.length - 1 ? "fw-bold border-top" : ""}
          >
            <td className={index === rows.length - 1 ? "" : "text-muted"}>{row.concepto}</td>
            <td className={`text-end ${index === rows.length - 1 ? "text-success" : ""}`}>{row.monto}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Table;