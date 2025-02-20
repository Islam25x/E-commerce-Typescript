import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavHomeAcc from "../nav/navHomeAcc";
import { Link } from "react-router";
import { useAppSelector, useAppDispatch } from "../Redux/Store";
import { changePassword } from "../Redux/LoginSystem/UserSlice";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Account.css";

const Account: React.FC = () => {
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
      toast.error("All fields are required!");
      return;
    }

    if (currentPassword !== password) {
      toast.error("Current password is incorrect!");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match!");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("New password must be at least 6 characters long!");
      return;
    }

    dispatch(changePassword({ email, password: newPassword }));
    toast.success("Password changed successfully!");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <>
      <NavHomeAcc />
      <section id="Account">
        <Container>
          <ToastContainer position="top-center" autoClose={3000} transition={Bounce} />
          <header className="d-flex justify-content-between">
            <p className="Path">
              Home /<span className="text-dark"> My Account</span>
            </p>
            <p className="welcome text-dark">
              Welcome!<span className="text-danger"> {username}</span>
            </p>
          </header>
          <Row className="my-4">
            <Col lg={4} md={4} sm={12}>
              <div className="left">
                <h6>Manage My Account</h6>
                <ul>
                  <li className="text-danger">My Profile</li>
                  <li>Address Book</li>
                  <Link to={'/Cart/CheckOut'}>
                    <li>My Payment Options</li>
                  </Link>
                </ul>
                <h6>My Orders</h6>
                <ul>
                  <li>My Returns</li>
                  <Link to={'/Favorite'}>
                    <li>My Cancellations</li>
                  </Link>
                </ul>
                <h6>My WishList ({FavProducts.length})</h6>
              </div>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <div className="right">
                <div className="right-ctn">
                  <h5 className="text-danger mb-4">Edit Your Profile</h5>
                  <div>
                    <div className="name d-flex justify-space-between">
                      <div className="in-container">
                        <h6>First Name</h6>
                        <input type="text" placeholder={firstName} disabled />
                      </div>
                      <div className="in-container ms-5">
                        <h6>Last Name</h6>
                        <input type="text" placeholder={lastName} disabled />
                      </div>
                    </div>
                    <div className="name d-flex justify-space-between">
                      <div className="in-container">
                        <h6>Email</h6>
                        <input type="email" placeholder={email} disabled />
                      </div>
                      <div className="in-container ms-5">
                        <h6>Address</h6>
                        <input
                          type="text"
                          placeholder="Kingston, 5236, United States"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                  <form>
                    <h2>Password Changes</h2>
                    <input
                      name="currentPassword"
                      type="password"
                      placeholder="Current Password"
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      value={currentPassword}
                      required
                    />
                    <input
                      name="newPassword"
                      type="password"
                      placeholder="New Password"
                      onChange={(e) => setNewPassword(e.target.value)}
                      value={newPassword}
                      required
                    />
                    <input
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm New Password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      value={confirmPassword}
                      required
                    />
                    <div className="button-container">
                      <button type="button" className="cancel-btn">
                        Cancel
                      </button>
                      <button type="button" className="save-btn" onClick={handleChangePassword}>
                        Save Changes
                      </button>
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