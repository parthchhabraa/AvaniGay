import { useSearchParams, useNavigate } from "react-router-dom";
import { useCaseContext } from "../state/CaseContext";
import { investigationProgress } from "../state/progress";
import ProgressBar from "../components/ProgressBar";
import {
  FolderIcon,
  UsersIcon,
  MagnifierIcon,
  MapIcon,
  ChatIcon,
  ClockIcon,
  PinboardIcon,
  NotebookIcon,
  GavelIcon,
} from "../components/icons";

import CaseTab from "../components/tabs/CaseTab";
import SuspectsTab from "../components/tabs/SuspectsTab";
import EvidenceTab from "../components/tabs/EvidenceTab";
import LocationsTab from "../components/tabs/LocationsTab";
import InterrogationTab from "../components/tabs/InterrogationTab";
import TimelineTab from "../components/tabs/TimelineTab";
import BoardTab from "../components/tabs/BoardTab";
import NotesTab from "../components/tabs/NotesTab";
import AccuseTab from "../components/tabs/AccuseTab";

const TABS = [
  { id: "case", label: "Case", icon: FolderIcon },
  { id: "suspects", label: "Suspects", icon: UsersIcon },
  { id: "evidence", label: "Evidence", icon: MagnifierIcon },
  { id: "locations", label: "Locations", icon: MapIcon },
  { id: "statements", label: "Interrogate", icon: ChatIcon },
  { id: "timeline", label: "Timeline", icon: ClockIcon },
  { id: "board", label: "Board", icon: PinboardIcon },
  { id: "notes", label: "Notes", icon: NotebookIcon },
  { id: "accuse", label: "Accuse", icon: GavelIcon },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function InvestigationDashboard() {
  const { kase, progress } = useCaseContext();
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const activeTab = (params.get("tab") as TabId) || "case";

  const setTab = (tab: TabId) => {
    setParams({ tab }, { replace: false });
  };

  const percent = investigationProgress(kase, progress);

  return (
    <div className="min-h-[calc(100vh-73px)] bg-noir-900 bg-noise">
      {/* Case sub-header */}
      <div className="sticky top-[73px] z-30 border-b border-noir-700/80 bg-noir-900/95 backdrop-blur">
        <div className="mx-auto max-w-6xl px-5 py-4 sm:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <button
                onClick={() => navigate("/cases")}
                className="stamp text-[11px] text-brass-400/70 hover:text-brass-300"
              >
                {kase.number} · {kase.title}
              </button>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden text-[10px] uppercase tracking-wide text-paper-400/50 sm:inline">
                Investigation Progress
              </span>
              <ProgressBar percent={percent} />
            </div>
          </div>

          {/* Tab bar */}
          <nav className="mt-4 -mb-px flex gap-1 overflow-x-auto pb-px">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTab(tab.id)}
                  className={`btn-press flex shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors ${
                    isActive
                      ? "border-brass-400 text-brass-300"
                      : "border-transparent text-paper-400/60 hover:text-paper-200"
                  } ${tab.id === "accuse" ? "ml-auto" : ""}`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                  {tab.id === "accuse" && (
                    <span className="ml-1 h-1.5 w-1.5 rounded-full bg-burgundy-400" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab content */}
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <div key={activeTab} className="animate-fade-in-fast">
          {activeTab === "case" && <CaseTab onNavigateTab={setTab} />}
          {activeTab === "suspects" && <SuspectsTab />}
          {activeTab === "evidence" && <EvidenceTab />}
          {activeTab === "locations" && <LocationsTab onNavigateTab={setTab} />}
          {activeTab === "statements" && <InterrogationTab />}
          {activeTab === "timeline" && <TimelineTab />}
          {activeTab === "board" && <BoardTab />}
          {activeTab === "notes" && <NotesTab />}
          {activeTab === "accuse" && <AccuseTab />}
        </div>
      </div>
    </div>
  );
}
