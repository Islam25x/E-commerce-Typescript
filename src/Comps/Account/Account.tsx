import { useState , useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavHomeAcc from "../nav/navHomeAcc";
import { Link } from "react-router";
import { useAppSelector, useAppDispatch } from "../Redux/Store";
import { changePassword } from "../Redux/LoginSystem/UserSlice";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useTranslation } from "react-i18next";
import "react-toastify/dist/ReactToastify.css";
import "./Account.css";

const Account: React.FC = () => {
  const { t , i18n } = useTranslation();
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const dispatch = useAppDispatch();
  const { username, email, password } = useAppSelector((state) => state.user.currentUser);
  const FavProducts = useAppSelector((state) => state.favourites.favourites);

  const firstName: string = username ? username.split(" ")[0] : "null";
  const lastName: string = username ? username.split(" ")[1] : "null";

  const handleChangePassword = (): void => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error(t("allFieldsRequired"));
      return;
    }
    if (currentPassword !== password) {
      toast.error(t("incorrectCurrentPassword"));
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error(t("passwordsDoNotMatch"));
      return;
    }
    if (newPassword.length < 6) {
      toast.error(t("passwordMinLength"));
      return;
    }
    dispatch(changePassword({ email, password: newPassword }));
    toast.success(t("passwordChangedSuccessfully"));
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

      useEffect(() => {
          document.getElementById("Account")?.setAttribute("dir", i18n.language === "ar" ? "rtl" : "ltr");
      }, [i18n.language]);

  return (
    <>
      <NavHomeAcc />
      <section id="Account">
        <Container>
          <ToastContainer position="top-center" autoClose={3000} transition={Bounce} />
          <header className="d-flex justify-content-between">
            <p className="Path">{t("Home")} / <span className="text-dark">{t("myAccount")}</span></p>
            <p className="welcome text-dark">{t("welcome")}, <span className="text-danger">{username}</span></p>
          </header>
          <Row className="my-4">
            <Col lg={4} md={4} sm={12}>
              <div className="left">
                <h6>{t("manageMyAccount")}</h6>
                <ul>
                  <li className="text-danger">{t("myProfile")}</li>
                  <li>{t("addressBook")}</li>
                  <Link to={'/Cart/CheckOut'}><li>{t("myPaymentOptions")}</li></Link>
                </ul>
                <h6>{t("myOrders")}</h6>
                <ul>
                  <li>{t("myReturns")}</li>
                  <Link to={'/Favorite'}><li>{t("myCancellations")}</li></Link>
                </ul>
                <h6>{t("myWishList")} ({FavProducts.length})</h6>
              </div>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <div className="right">
                <div className="right-ctn">
                  <h5 className="text-danger mb-4">{t("editYourProfile")}</h5>
                  <div>
                    <div className="name d-flex justify-space-between">
                      <div className="in-container">
                        <h6>{t("firstName")}</h6>
                        <input type="text" placeholder={firstName} disabled />
                      </div>
                      <div className="in-container ms-5">
                        <h6>{t("lastName")}</h6>
                        <input type="text" placeholder={lastName} disabled />
                      </div>
                    </div>
                    <div className="name d-flex justify-space-between">
                      <div className="in-container">
                        <h6>{t("email")}</h6>
                        <input type="email" placeholder={email} disabled />
                      </div>
                      <div className="in-container ms-5">
                        <h6>{t("address")}</h6>
                        <input type="text" placeholder={t("defaultAddress")} disabled />
                      </div>
                    </div>
                  </div>
                  <form>
                    <h2>{t("passwordChanges")}</h2>
                    <input
                      name="currentPassword"
                      type="password"
                      placeholder={t("currentPassword")}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      value={currentPassword}
                      required
                    />
                    <input
                      name="newPassword"
                      type="password"
                      placeholder={t("newPassword")}
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      required
                    />
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder={t("confirmNewPassword")}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      required
                    />
                    <div className="button-container">
                      <button type="button" className="cancel-btn">{t("cancel")}</button>
                      <button type="button" className="save-btn" onClick={handleChangePassword}>{t("saveChanges")}</button>
                    </div>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Account;
