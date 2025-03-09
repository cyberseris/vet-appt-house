import { useForm } from "react-hook-form";
import Icon from "../components/common/Icon";
import Navbar from "../components/common/NavBar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

export default function LoginPage() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // 處理登入
  const onSubmit = async (data) => {
    try {
      const response = await api.post(`login`, {
        email: data.email,
        password: data.password,
      });

      if (response.data) {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        navigate("/user");
        toast("登入成功", {className: "toast-success"})
      }
    } catch (error) {
      console.error("登入失敗:", error);
      alert("登入失敗，請檢查帳號密碼是否正確");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login d-flex justify-content-center align-items-center hv100-with-nav p-4">
        <div className="block bg-primary p-4">
          <h3 className="text-center mb-3">登入</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-field flex-column gap-1 mb-3">
              <label className="form-label" htmlFor="login-page-email">
                電子郵件
              </label>
              <input
                autoComplete="email"
                type="email"
                id="login-page-email"
                className={`input-text-primary ${errors.email ? "error" : ""}`}
                {...register("email", {
                  required: "請輸入電子郵件",
                  pattern: {
                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                    message: "無效的電子郵件",
                  },
                })}
              />
              {errors.email && (
                <p className="text-error fs-6 d-flex align-items-center gap-2">
                  <Icon fileName={"error"} size={20} />
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="input-field flex-column gap-1 mb-3">
              <label className="form-label" htmlFor="login-page-password">
                密碼
              </label>
              <input
                type="password"
                id="login-page-password"
                className={`input-text-primary ${
                  errors.password ? "error" : ""
                }`}
                {...register("password", { required: "請輸入密碼" })}
              />
              {errors.password && (
                <p className="text-error fs-6 d-flex align-items-center gap-2">
                  <Icon fileName={"error"} size={20} />
                  {errors.password.message}
                </p>
              )}
            </div>
            <button type="submit" className="btn-m btn-quaternary w-100">
              登入
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
