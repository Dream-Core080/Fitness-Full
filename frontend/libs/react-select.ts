import type { StylesConfig } from "react-select";

const reactSelectStylesConfig: StylesConfig = {
  container: (base) => ({ ...base }),
  control: (base, state) => ({
    ...base,
    color: "#fff",
    border: "1px solid #333",
    padding: "10px 12px",
    background: "#161616",
    boxShadow: "none",
    borderRadius: 12,
    gap: 30,
    ":hover": {
      background: "#0e0e0e", //state.isFocused ? '#fff' : '#F5F5F5',
      //border: state.isFocused ? '1px solid grey' : '1px solid grey',
    },
    ":active": {
      //borderRadius: '12px 12px 0 0'
    },
  }),
  indicatorSeparator: (base) => ({
    ...base,
    display: "none",
  }),
  valueContainer: (base) => ({
    ...base,
    padding: 0,
  }),
  dropdownIndicator: (base, state) => ({
    ...base,
    transform: state.selectProps.menuIsOpen
      ? "translateY(-50%) rotate(180deg)"
      : "translateY(-50%) rotate(0deg)",
    transition: "all 0.3s ease-in-out",
    position: "absolute",
    color: "#C3C6D1",
    padding: 0,
    right: 12,
    top: "50%",
  }),
  input: (base) => ({
    ...base,
    lineHeight: "21px",
    fontSize: "14px",
    color: "white",
    fontWeight: 400,
    padding: 3,
    margin: 0,
  }),
  placeholder: (base) => ({
    ...base,
    color: "#4d4d4d",
    fontSize: 14,
  }),
  singleValue: (base, state) => ({
    ...base,
    color: state.hasValue ? "#fff" : "#C7C7C7",
    lineHeight: "21px",
    fontSize: "14px",
    fontWeight: 400,
    margin: 0,
  }),
  menu: (base) => ({
    ...base,
    borderRadius: "12px 12px 12px 12px",
    border: "1px solid #333",
    overflow: "hidden",
    background: "#161616",
    zIndex: 5,
  }),
  menuList: (base) => ({
    ...base,
    padding: 0,
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "14px",
    lineHeight: "21px",
    color: "#707070",
    background: state.isFocused ? "#060606" : "#0d0d0d",
    opacity: state.isDisabled ? 0.5 : 1,
    cursor: state.isDisabled ? "not-allowed" : "pointer",
    ":active": {
      background: "#000",
    },
    ":hover": {
      color: "white",
    },
  }),
  clearIndicator: (base) => ({
    ...base,
    margin: 0,
    padding: 0,
    marginRight: 20,
  }),
  multiValue: (styles) => ({
    ...styles,
    display: "inline-flex",
    margin: "0 5px",
    backgroundColor: "#333",
    borderRadius: "12px",
  }),
  multiValueLabel: (styles, { data }) => ({
    ...styles,
    color: "white",
  }),
};

export default reactSelectStylesConfig;
