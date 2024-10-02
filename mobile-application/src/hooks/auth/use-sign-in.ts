import { useMutation } from "@tanstack/react-query";
import api, { REQUEST_URL } from "@utils/api";
import toast from "@components/toast";
type SignInType = {
  username: string;
  password: string;
};

export interface Root {
  success: boolean;
  accessToken: string;
  data: Data;
}

export interface Data {
  user: User;
  settingsDefault: SettingsDefault;
}

export interface User {
  notifyPlatform: NotifyPlatform;
  setting: Setting;
  lineManager: any;
  leave_approver: any;
  internship_type: any;
  availableLeaves: number;
  availableWfhDays: number;
  is_support_working_leave: boolean;
  totalWfhDays: number;
  totalDayLeave: number;
  role: number;
  switchRole: boolean;
  status: string;
  confirmed: boolean;
  partnerMembers: any[];
  is_cv: boolean;
  is_syll: boolean;
  is_registration_book: boolean;
  is_identify_id: boolean;
  is_job_application: boolean;
  is_degree: boolean;
  is_health_certification: boolean;
  is_portrait: boolean;
  deleted: boolean;
  children: any[];
  _id: string;
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  jobTitle: string;
  title: number;
  mobile: string;
  birthDay: string;
  identify_id: string;
  identify_issued_date: string;
  identify_issued_by: string;
  address: string;
  temporary_address: string;
  bank_info: BankInfo[];
  contract_no: string;
  joinedDate: string;
  contract_sign_times: number;
  partner: string;
  createdAt: string;
  updatedAt: string;
  path: string;
  __v: number;
  picture: string;
  password: string;
}

export interface NotifyPlatform {
  slack: string;
  telegram: string;
  zalo: string;
}

export interface Setting {
  member: Member;
  language: string;
}

export interface Member {
  sandbox: Sandbox;
}

export interface Sandbox {
  noSandboxDisplay: string;
}

export interface BankInfo {
  _id: string;
}

export interface SettingsDefault {}

const useSignIn = () => {
  const {
    data,
    mutateAsync: submit,
    error,
    isPending: submitting,
    isError,
  } = useMutation({
    mutationFn: async (variables: SignInType) => {
      const res = (await api({
        url: REQUEST_URL.SIGN_IN,
        method: "POST",
        data: variables,
      })) as any;
      return res;
    },

    onSuccess: () => {
      toast.success("Đăng nhập thành công");
    },
    onError: (error: any) => {
      if (error.response) {
        if (error.response.status === 400) {
          toast.error(error?.response?.data?.message);
        } else if (error.response.status === 403) {
          toast.error("Bạn không có quyền truy cập vào tài nguyên này.");
        }
      } else {
        toast.error(error?.response?.data?.message);
      }
    },
    networkMode: "always",
  });
  return {
    data,
    submit,
    error,
    isError,
    submitting,
  };
};
export default useSignIn;
