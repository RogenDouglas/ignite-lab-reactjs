import { CheckCircle, Lock } from "phosphor-react";

import { isPast, format } from "date-fns";
import ptBr from "date-fns/locale/pt-BR";
import { Link, useParams } from "react-router-dom";

import classnames from "classnames";

export interface LessonProps {
  id: string;
  title: string;
  slug: string;
  availableAt: string;
  lessonType: "live" | "class";
}

export function Lesson({ title, slug, availableAt, lessonType }: LessonProps) {
  const isLessonAvailable = isPast(new Date(availableAt));
  const availableAtFormated = format(
    new Date(availableAt),
    "EEEE' • 'd' de 'MMMM' • 'k'h'mm",
    {
      locale: ptBr,
    }
  );

  const params = useParams<{ slug: string }>();
  const isActive = params.slug === slug;

  return (
    <Link to={`/event/lesson/${slug}`} className="group">
      <span className="text-gray-300">{availableAtFormated}</span>
      <div
        className={classnames(
          "rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500",
          {
            "bg-green-500": isActive,
          }
        )}
      >
        <header className="flex items-center justify-between">
          {isLessonAvailable ? (
            <span
              className={classnames(
                "text-sm font-medium flex items-center gap-2",
                {
                  "text-blue-500": !isActive,
                  "text-white": isActive,
                }
              )}
            >
              <CheckCircle size={20} />
              Conteúdo liberado
            </span>
          ) : (
            <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
              <Lock size={20} />
              Em breve
            </span>
          )}
          <span
            className={classnames(
              "text-xs rounded py-[0.125rem] px-2 text-white border font-bold",
              {
                "border-green-300": !isActive,
                "border-white": isActive,
              }
            )}
          >
            {lessonType === "live" ? "AO VIVO" : "AULA PRÁTICA"}
          </span>
        </header>
        <strong
          className={classnames("mt-5 block", {
            "text-gray-200": !isActive,
            "text-white-100": isActive,
          })}
        >
          {title}
        </strong>
      </div>
    </Link>
  );
}
