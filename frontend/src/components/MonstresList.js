import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Monstres = (props) => (
  <tr>
    <td>{props.monstre.nom}</td>
    <td>{props.monstre.HP}</td>
    <td>{props.monstre.Attaques ? props.monstre.Attaques.join(", ") : ""}</td>
    <td>
      <Link className="btn btn-link" to={`/edit/${props.monstre._id}`}>
        Edit
      </Link>{" "}
      |
      <button
        className="btn btn-link"
        onClick={() => {
          props.deleteMonstre(props.monstre._id);
        }}
      >
        Delete
      </button>
    </td>
  </tr>
);

export default function MonstresList() {
  const [monstres, setMonstres] = useState([]);

  // This method fetches the monstres from the database.
  useEffect(() => {
    async function getMonstres() {
      const response = await fetch(`http://localhost:5000/monstres/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const monstres = await response.json();
      setMonstres(monstres);
    }

    getMonstres();

    return;
  }, [monstres.length]);

  // This method will delete a monstre
  async function deleteMonstre(id) {
    await fetch(`http://localhost:5000/monstres/${id}`, {
      method: "DELETE",
    });

    const newMonstres = monstres.filter((el) => el._id !== id);
    setMonstres(newMonstres);
  }

  // This method will map out the monstres on the table
  function MonstresList() {
    return monstres.map((monstre) => {
      return (
        <Monstres
          monstre={monstre}
          deleteMonstre={() => deleteMonstre(monstre._id)}
          key={monstre._id}
        />
      );
    });
  }

  // This following section will display the table with the monstres of individuals.
  return (
    <div>
      <h3>Monster List</h3>
      <table className="table table-striped" style={{ marginTop: 20 }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Points de vie</th>
            <th>Attaques</th>
          </tr>
        </thead>
        <tbody>{MonstresList()}</tbody>
      </table>
    </div>
  );
}
