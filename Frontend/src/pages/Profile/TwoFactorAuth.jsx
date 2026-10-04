import { ShieldCheck, Smartphone, Lock, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function TwoFactorAuth() {

    const navigate = useNavigate();

    return (

        <div className="mx-auto max-w-3xl px-8 py-10">

            <button
                onClick={() => navigate(-1)}
                className="mb-6 text-blue-400 hover:text-blue-300"
            >
                ← Back
            </button>

            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-xl">

                <div className="mb-8 flex items-center gap-4">

                    <div className="rounded-2xl bg-blue-500/10 p-4">
                        <ShieldCheck
                            size={34}
                            className="text-blue-400"
                        />
                    </div>

                    <div>

                        <h1 className="text-3xl font-bold text-white">
                            Two-Factor Authentication
                        </h1>

                        <p className="mt-2 text-slate-400">
                            Add an extra layer of security to your account.
                        </p>

                    </div>

                </div>

                <div className="space-y-5">

                    <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-5">

                        <div className="flex items-center gap-3">

                            <Lock className="text-green-400" />

                            <h2 className="text-lg font-semibold text-white">
                                Account Security
                            </h2>

                        </div>

                        <p className="mt-3 text-slate-400">
                            Protect your account by enabling Two-Factor Authentication.
                            Every login will require a verification code.
                        </p>

                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-5">

                        <div className="flex items-center gap-3">

                            <Smartphone className="text-cyan-400" />

                            <h2 className="text-lg font-semibold text-white">
                                Authentication App
                            </h2>

                        </div>

                        <p className="mt-3 text-slate-400">
                            Compatible with Google Authenticator, Microsoft Authenticator
                            and Authy.
                        </p>

                    </div>

                    <div className="rounded-xl border border-slate-800 bg-slate-800/40 p-5">

                        <div className="flex items-center gap-3">

                            <CheckCircle className="text-yellow-400" />

                            <h2 className="text-lg font-semibold text-white">
                                Current Status
                            </h2>

                        </div>

                        <p className="mt-3 text-red-400 font-medium">
                            Disabled
                        </p>

                    </div>

                </div>

                <button
                    onClick={() =>
                        toast("2FA setup will be available in a future update.")
                    }
                    className="mt-8 w-full rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
                >
                    Enable Two-Factor Authentication
                </button>

            </div>

        </div>

    );

}

export default TwoFactorAuth;