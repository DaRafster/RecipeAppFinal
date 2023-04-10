import styled from "styled-components";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Search() {
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/searched/${input}`);
  };

  return (
    <FormStyle onSubmit={submitHandler}>
      <div className="searchDiv">
        <FaSearch></FaSearch>
        <input
          onChange={(e) => setInput(e.target.value)}
          type="text"
          value={input}
        />
      </div>
    </FormStyle>
  );
}

const FormStyle = styled.form`
  margin: 0rem 20rem;

  div {
    position: relative;
    display: flex;
    width: 100%;
    z-index: 4;
    align-items: center;
    justify-content: center;
  }

  input {
    border: none;
    background: linear-gradient(35deg, #494949, #313131);
    padding: 1rem;
    border: none;
    border-radius: 1rem;
    outline: none;
    width: 50%;
    color: white;
    font-size: 1.5rem;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 70%;
    transform: translate(100%, -50%);
    color: white;
    font-size: 1.5rem;
  }
`;

export default Search;
