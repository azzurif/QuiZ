import React, { useState } from "react";
import Layout from "@/Layouts/Layout";
import PrimaryButton from "@/Components/PrimaryButton";
import { useForm } from "@inertiajs/react";

const Show = ({ auth, quiz }) => {
    const [answers, setAnswers] = useState([]);

    const { data, setData, post, processing } = useForm({
        user_id: auth.user.id,
        quiz_id: quiz.id,
        score: 0,
    });

    const handleAnswerChange = (qIndex, answer) => {
        const newAnswers = [...answers];
        newAnswers[qIndex] = answer;
        setAnswers(newAnswers);
    };

    const handleSubmit = (e) => {
        const questionScore = 100 / quiz.questions.length;

        answers.map((answer) => {
            if (answer.is_correct) data.score += questionScore;
        });
        setData("score", data.score);

        e.preventDefault();
        post(route("attempt.store"), {
            onSuccess: () => {
                window.location.href = route("attempt.result", {
                    quiz: quiz.slug,
                    user: auth.user.id,
                });
            },
        });
    };

    return (
        <Layout auth={auth.user} header={quiz.title} title={quiz.title}>
            {quiz.questions.length > 0 ? (
                <form onSubmit={handleSubmit}>
                    <ul className="list-decimal space-y-4 ml-2">
                        {quiz.questions.map((question, qIndex) => (
                            <li key={qIndex}>
                                <h2>{question.content}</h2>
                                <div className="space-y-2">
                                    {question.answers.map((answer, aIndex) => (
                                        <div
                                            className="flex space-x-2"
                                            key={aIndex}
                                        >
                                            <input
                                                type="radio"
                                                id={`answer_${qIndex}_${aIndex}`}
                                                name={`correct_answer_${qIndex}`}
                                                className="radio"
                                                onChange={() =>
                                                    handleAnswerChange(
                                                        qIndex,
                                                        answer
                                                    )
                                                }
                                            />
                                            <label
                                                htmlFor={`answer_${qIndex}_${aIndex}`}
                                                className="w-full"
                                            >
                                                {answer.content}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                    <PrimaryButton disabled={processing} className="mt-4">
                        Send
                    </PrimaryButton>
                </form>
            ) : (
                <p>There's no questions yet.</p>
            )}
        </Layout>
    );
};

export default Show;
