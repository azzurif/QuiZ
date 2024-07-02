import { Link, router } from "@inertiajs/react";
import { PencilSimple, XCircle } from "@phosphor-icons/react";
import { formatDistance } from "date-fns";
import React from "react";

const Card = ({ quizzes, show }) => {
    const deleteQuiz = (slug) => {
        router.delete(route("quiz.destroy", slug));
    };

    return (
        <div className="grid grid-cols-1 w-full md:grid-cols-4 gap-2">
            {quizzes.length > 0 ? (
                quizzes.map((quiz) => (
                    <div
                        key={quiz.id}
                        className="border border-green-400 py-4 px-2 rounded-md"
                    >
                        <div className="flex justify-between items-center">
                            <div className="text-sm">
                                <Link
                                    href={`/users/${quiz.user.id}`}
                                    className="text-green-300"
                                >
                                    {quiz.user.name}
                                </Link>
                                <p className="text-slate-400">
                                    {`latest update:  `}
                                    {formatDistance(
                                        quiz.created_at,
                                        new Date(),
                                        { addSuffix: true }
                                    )}
                                </p>
                            </div>

                            {show && (
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => deleteQuiz(quiz.slug)}
                                    >
                                        <XCircle size={24} color="blue" />
                                    </button>
                                    <Link href={route("quiz.edit", quiz)}>
                                        <PencilSimple size={24} />
                                    </Link>
                                </div>
                            )}
                        </div>
                        <br />
                        <Link href={route("quiz.show", quiz)}>
                            {quiz.title}
                        </Link>
                    </div>
                ))
            ) : (
                <p className="text-slate-500">You have no quizzes yet.</p>
            )}
        </div>
    );
};

export default Card;
