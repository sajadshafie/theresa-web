import Image from "next/image";
import Link from "next/link";
import styles from "../../styles/formauth.module.css";

export default function FormAuth({
  children,
  logo = "/img/logo.svg",
  slide = "/img/slide.svg",
  title = "TERESA HEALTH",
  description = "",
  bottomText = "Not a user?",
  bottomLinkText = "Sign Up",
  bottomLinkAction = "/",
  marginMode = false,
}) {
  return (
    <>
      <div className={styles.slide}>
        <Image width="702" height="640" src={slide} alt={title} />
      </div>
      <div className={styles.form}>
        <div>
          <Image width="210" height="110" src={logo} alt={title} />
          <h1>{title}</h1>
          <p className={marginMode ? styles.formPmb : ""}>{description}</p>

          {children}

          <div className={styles.bottomSection}>
            <div>
              {bottomText}{" "}
              <Link href={bottomLinkAction}>
                <a title={title}>{bottomLinkText}</a>
              </Link>
            </div>
            <div>©2021 Teresa Health. All rights reservec.</div>
          </div>
        </div>
      </div>
    </>
  );
}
FormAuth.defaultProps = {
  accountMode: false,
};
