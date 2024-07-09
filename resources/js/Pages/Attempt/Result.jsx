import Layout from "@/Layouts/Layout";
import React from "react";
import CreateButton from "@/Components/CreateButton";
import { formatDistance } from "date-fns";

const Result = ({ auth, attempt }) => {
    return (
        <Layout auth={auth.user} header="Quiz result" title="Your quiz result">
            <div className="space-y-2">
                <p className="text-slate-500 text-sm ">
                    {`Submitted `}
                    {formatDistance(attempt.updated_at, new Date(), {
                        addSuffix: true,
                    })}
                </p>
                <div className="flex items-center gap-2">
                    Well, well, well:{" "}
                    <p className="font-semibold text-lg">{attempt.score}</p>
                </div>
                <CreateButton href={route("quiz.index")} className="w-auto">
                    Back to Quizzes
                </CreateButton>
            </div>
        </Layout>
    );
};

export default Result;
