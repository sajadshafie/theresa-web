import styles from "../../styles/Input.module.css";
import React, { useState, useEffect } from "react";

import GooglePlacesAutocomplete from "react-google-places-autocomplete";

export default function Input({
  label,
  placeholder,
  value,
  onChange,
  onClick,
  onClickEdit,
  onClickEditText = "Edit",
  children,
  icon,
  disabled,
  error,
  placeMode,
}) {
  const [disabledMode, setDisabledMode] = useState(disabled ? "active" : null);
  return (
    <div className={styles.input}>
      {label && <label>{label}</label>}
      <div className={error ? styles.errorMode : ""}>
        <div onClick={onClick && !disabled && onClick}>
          {disabled && (
            <div
              style={{ left: disabledMode === "editmode" ? "auto" : "0" }}
              className={styles.editButton}
            >
              <span
                style={{
                  color: onClickEditText === "Delete" ? "#E52836" : "inherit",
                }}
                onClick={() => {
                  onClickEdit
                    ? onClickEdit()
                    : setDisabledMode(
                        disabledMode === "editmode" ? "active" : "editmode"
                      );
                }}
              >
                {disabledMode === "editmode" ? "Cancel" : onClickEditText}
              </span>
            </div>
          )}
          {placeMode ? (
            <GooglePlacesAutocomplete
              apiOptions={{ language: "en", region: "ca" }}
              autocompletionRequest={{
                componentRestrictions: { country: "ca" },
              }}
              selectProps={{
                value,
                onChange,
                styles: {
                  input: (provided) => ({
                    color: "#004080",

                    borderWidth: 0,
                  }),
                  option: (provided) => ({
                    ...provided,
                    color: "#004080",
                    borderWidth: 0,
                  }),
                  singleValue: (provided) => ({
                    ...provided,
                    color: "#004080",
                    borderWidth: 0,
                  }),
                },
              }}
              apiKey="AIzaSyDSs8uf7dO8IYCuee6UeNfHsg6b1nc_qq0"
            />
          ) : (
            <input
              className={onClick ? "clickable" : ""}
              disabled={icon || disabledMode == "active" ? true : false}
              onChange={onChange}
              value={
                icon ? (value && value.length > 0 ? `Uploaded` : value) : value
              }
              autoComplete="off"
              placeholder={placeholder}
            />
          )}

          {icon && <img src={icon} alt="Plitio Website" />}
        </div>
        {children ? children : null}
      </div>
    </div>
  );
}

Input.defaultProps = {
  placeholder: "",
  label: null,
  onClickEdit: null,
};
