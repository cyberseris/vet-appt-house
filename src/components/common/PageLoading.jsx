import CatLoading from "./CatLoading";
import { useAppState } from "@/context/AppStateContext";

function easterEggType() {
  const rand = Math.random();

  if (rand < 0.97) return 1;
  if (rand < 0.99) return 2;
  if (rand < 0.995) return 3;
  return 4;
}

const PageLoading = () => {
  const { isPageLoading } = useAppState();
  return isPageLoading ? (
    <div
      className="d-flex flex-column justify-content-center align-items-center position-fixed"
      style={{
        inset: 0,
        backgroundColor: "#4444",
        zIndex: 100,
      }}
    >
      <CatLoading type={easterEggType()} />
    </div>
  ) : (
    <></>
  );
};

export default PageLoading;
