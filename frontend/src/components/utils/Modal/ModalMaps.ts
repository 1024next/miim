import dynamic from "next/dynamic";

const ModalMaps = {
  LoginModal: dynamic(() => import("@/app/(pages)/login/login")),
  SignupModal: dynamic(() => import("@/app/(pages)/login/signup")),
};

export default ModalMaps;
