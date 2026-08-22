import { Outlet, useNavigate, useParams } from "react-router-dom";
import { getCase } from "../data/cases";
import { useCaseProgress } from "../state/useCaseProgress";
import { CaseContext } from "../state/CaseContext";

export default function CaseLayout() {
  const { caseId } = useParams<{ caseId: string }>();
  const navigate = useNavigate();
  const kase = caseId ? getCase(caseId) : undefined;
  const progressApi = useCaseProgress(caseId ?? "unknown");

  if (!kase) {
    return (
      <div className="flex min-h-[calc(100vh-73px)] flex-col items-center justify-center gap-4 bg-noir-900 px-6 text-center">
        <div className="stamp text-burgundy-400">FILE NOT FOUND</div>
        <p className="text-paper-300/70">This case doesn't exist in the archive.</p>
        <button
          onClick={() => navigate("/cases")}
          className="btn-press rounded-sm border border-brass-500/50 px-5 py-2.5 text-sm font-semibold text-brass-300 hover:bg-brass-400/10"
        >
          Back to Case Files
        </button>
      </div>
    );
  }

  return (
    <CaseContext.Provider value={{ kase, ...progressApi }}>
      <Outlet />
    </CaseContext.Provider>
  );
}
