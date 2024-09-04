import Button from "@/src/components/Button";
import { useToast } from "@/src/contexts/Toast";
import { ChatBubbleBottomCenterTextIcon } from "@heroicons/react/24/solid";
import { useEffect, useRef } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useVerifyOTP } from "@/src/api/otp";

interface IFieldValues {
  otp: string[];
}

interface IProps {
  username: string;
}

const VerifyOTP = ({ username }: IProps) => {
  const [, setToast] = useToast();
  const navigate = useNavigate();
  const { trigger, isMutating } = useVerifyOTP({
    onError(err) {
      setToast([
        {
          message: err?.response?.data?.error || err.message,
          type: "error",
          close: () => setToast([]),
        },
      ]);
    },
  });
  const {
    handleSubmit,
    control,
    setValue,
    formState: { isValid },
    setFocus,
  } = useForm<IFieldValues>({
    defaultValues: { otp: [] },
    mode: "all",
  });
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setFocus("otp.0");
  }, [setFocus]);

  const handleOtp: SubmitHandler<IFieldValues> = async ({ otp }) => {
    const result = await trigger({ username, otp: otp.join("") });
    if (result.status === 200) {
      navigate("/");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    const previousSibling =
      currentTarget.previousSibling as HTMLInputElement | null;
    const nextSibling = currentTarget.nextSibling as HTMLInputElement | null;

    if (Number.isNaN(Number(event.key))) {
      event.preventDefault();
      return;
    }

    if (event.key === "ArrowLeft" && previousSibling) {
      event.preventDefault();
      previousSibling.select();
    } else if (event.key === "ArrowRight" && nextSibling) {
      event.preventDefault();
      nextSibling.select();
    } else if (
      event.key === "Backspace" &&
      previousSibling &&
      currentTarget.value === ""
    ) {
      event.preventDefault();
      previousSibling.select();
    }
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    const currentTarget = event.currentTarget;
    const value = currentTarget.value;

    if (Number.isNaN(Number(value))) {
      event.preventDefault();
      return;
    }
    const nextSibling = currentTarget.nextSibling as HTMLInputElement | null;
    const previousSibling =
      currentTarget.previousSibling as HTMLInputElement | null;
    setValue(event.currentTarget.name as `otp.${number}`, value);

    if (value && nextSibling) {
      nextSibling.select();
    } else if (!value && previousSibling) {
      previousSibling.select();
    } else if (value && !nextSibling && btnRef.current) {
      btnRef.current.disabled = false;
      btnRef.current.focus();
    }
  };

  return (
    <form
      className="flex flex-col sm:mx-auto sm:w-full sm:max-w-sm [&>*:not(:last-child)]:mb-8"
      onSubmit={handleSubmit(handleOtp)}
    >
      <ChatBubbleBottomCenterTextIcon className="fill-primary w-12 h-12 mx-auto animate-bounce" />
      <h2 className="text-center font-bold text-2xl">Check Telegram</h2>
      <div className="flex justify-between space-x-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <Controller
            key={index}
            name={`otp.${index}`}
            control={control}
            rules={{ maxLength: 1, required: true }}
            render={({ field }) => (
              <input
                {...field}
                onClick={(e) => e.currentTarget.select()}
                type="number"
                maxLength={1}
                className="w-12 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary no-arrows"
                onInput={handleChange}
                onKeyDown={handleKeyDown}
              />
            )}
          />
        ))}
      </div>
      <Button
        color="primary"
        type="submit"
        disabled={isMutating || !isValid}
        isLoading={isMutating}
        ref={btnRef}
      >
        Sign in
      </Button>
    </form>
  );
};

export default VerifyOTP;
