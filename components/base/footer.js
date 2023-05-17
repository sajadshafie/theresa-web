import styles from "../../styles/Footer.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer({ userState }) {
  return (
    <footer className={styles.footer}>
      <div className="app-container app-container-footer">
        <div className={styles.fastaccess}>
          <div className={styles.fastaccessmenus}>
            <div>
              <ul>
                <li>
                  <Link href="/howworks">
                    <a>How it works</a>
                  </Link>
                </li>
                <li>
                  <Link href="/customers">
                    <a>Customers</a>
                  </Link>
                </li>
                <li>
                  <Link href="/doctors">
                    <a>Doctors</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <ul>
                <li>
                  {userState ? (
                    <Link href="/account/dashboard">
                      <a>Dashboard</a>
                    </Link>
                  ) : (
                    <Link href="/login">
                      <a>Sign In</a>
                    </Link>
                  )}
                </li>
                <li>
                  <Link href="/pricing">
                    <a>Pricing</a>
                  </Link>
                </li>
                <li>
                  <Link href="/help">
                    <a>Help</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.fastaccesslogo}>
            <img src="/img/logo-w.svg" alt="Plitio Website" />
            <p>
              ©2021 Plitio Pharmacy. All rights reserved.
              <br />
              Website by{" "}
              <a
                title="Hooman Studio"
                target="_blank"
                href="https://www.hoomanstudio.com/"
              >
                Hooman Studio
              </a>
            </p>
          </div>
        </div>
        <div className={styles.footersocial}>
          <div className={styles.footersocialText}>
            Sign up for the latest scoop
          </div>
          <div className={styles.footersocialNewsletter}>
            <input placeholder="Email address" autoComplete="off" />
            <button>Submit</button>
          </div>
          <div className={styles.footersocialLinks}>
            <a href="https://www.facebook.com/Plitio">
              <div className={styles.socialImageFacebook}></div>
            </a>
            <a href="https://www.linkedin.com/company/plitio/">
              <div className={styles.socialImageLinkedin}></div>
            </a>
            <a href="https://www.instagram.com/plitiopharmacy/">
              <div className={styles.socialImageInstagram}></div>
            </a>
            <a href="https://twitter.com/Plitio1">
              <div className={styles.socialImageTwitter}></div>
            </a>
          </div>

          <div className={styles.footersocialText}>
            1-888-9-PLITIO (1-888-975-4846)
          </div>
          <div className={styles.footersocialExtra}>
            <Link href="/privacy-policy">
              <a>Privacy and Policy</a>
            </Link>{" "}
            | <a href="">Terms and Conditions</a>
          </div>
        </div>
        <div className={styles.fastaccessmobilelogo}>
          <img src="/img/logo-w.svg" alt="Plitio Website" />
        </div>
      </div>
    </footer>
  );
}
