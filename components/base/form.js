import styles from "../../styles/formauth.module.css";

export default function FormAuth({
  children,
  title,
  description,
  iconTitle,
  accountMode,
  onConfirm,
  onBack,
  isChanged,
}) {
  return (
    <form className={styles.container}>
      {accountMode && (
        <div className={styles.nav}>
          <button type="button" onClick={() => onBack()}>
            <img src={"/img/form/back.svg"} />
            <span>Back</span>
          </button>
          {isChanged ? (
            <button type="button" onClick={() => onConfirm()}>
              <span style={{ marginRight: 10 }}>Save</span>
              <img className={styles.navConfirmImg} src={"/img/confirm.svg"} />
            </button>
          ) : (
            <button disabled type="button">
              <span style={{ marginRight: 10, color: "#a1a1a1" }}>Save</span>
              <img
                className={styles.navConfirmImg}
                src={"/img/confirmGary.svg"}
              />
            </button>
          )}
        </div>
      )}

      {title && (
        <div
          className={`${styles.header} ${accountMode && styles.accountHeader}`}
        >
          <h1>{title}</h1>
          {iconTitle && <img src={iconTitle} alt="Plitio Website" />}
        </div>
      )}
      {description && <p>{description}</p>}
      {children}
    </form>
  );
}
Form.defaultProps = {
  accountMode: false,
};
