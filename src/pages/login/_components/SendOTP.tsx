import Button from "@/src/components/Button";
import Input from "@/src/components/Input";
import { useToast } from "@/src/contexts/Toast";
import { ArrowLongRightIcon, FilmIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useSendOTP } from "@/src/api/otp";

interface IFieldValues {
  username: string;
}

interface IProps {
  setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const SendOTP = ({ setUsername }: IProps) => {
  const { handleSubmit, register, setFocus } = useForm<IFieldValues>();
  const [, setToast] = useToast();
  const { trigger, isMutating } = useSendOTP({
    onError(err) {
      console.log(err);
      setToast([
        {
          message: err?.response?.data?.error || err.message,
          type: "error",
          close: () => setToast([]),
        },
      ]);
    },
  });

  const handleUsername: SubmitHandler<IFieldValues> = async ({ username }) => {
    const result = await trigger({ username });
    console.log(result);
    if (result.status === 200) {
      setUsername(username);
    }
  };

  useEffect(() => {
    setFocus("username");
  }, [setFocus]);

  return (
    <form
      className="flex flex-col sm:mx-auto sm:w-full sm:max-w-sm [&>*:not(:last-child)]:mb-8"
      onSubmit={handleSubmit(handleUsername)}
    >
      <FilmIcon className="fill-primary w-12 h-12 mx-auto" />
      <h2 className="text-center font-bold text-2xl">
        Sign in to your account
      </h2>
      <Input
        label="Username"
        {...register("username", { required: true })}
        outlined
      />
      <Button
        color="primary"
        type="submit"
        disabled={isMutating}
        isLoading={isMutating}
        icon={{ Component: ArrowLongRightIcon, type: "lead" }}
      >
        Next
      </Button>
    </form>
  );
};

export default SendOTP;
