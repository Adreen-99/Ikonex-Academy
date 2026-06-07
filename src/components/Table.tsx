interface TableProps {
  columns: string[];
  data: any[];
}

export default function Table({
  columns,
  data,
}: TableProps) {
  return (
    <table
      border={1}
      cellPadding={10}
      width="100%"
    >
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column}>
              {column}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {columns.map((column) => (
              <td key={column}>
                {row[column]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}