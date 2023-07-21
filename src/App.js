import './App.css';
import {TicketGenerator} from "./TicketGenerator"

function App() {
  return (
    <div className="App">
      {Array.from({length: 36}).map(()=>
        ticket())}
    </div>
  );
}

export default App;
function ticket() {
  const nums = new TicketGenerator().generate();
  return <div>
    {/* <img src={header}></img> */}
    <table>
      {Array.from({ length: 3 }).map((_, row) => {
        return (<tr key={row}>
          <td>{readNextNum()}</td>
          <td>{readNextNum()}</td>
          <td>{readNextNum()}</td>
          <td>{readNextNum()}</td>
          <td>{readNextNum()}</td>
          <td>{readNextNum()}</td>
          <td>{readNextNum()}</td>
          <td>{readNextNum()}</td>
          <td>{readNextNum()}</td>
        </tr>);
      })}
    </table>
  </div>;

  function readNextNum() {
    return nums.splice(0, 1)[0];
  }
}

