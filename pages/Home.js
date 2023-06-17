import LogoffFooter from "@/components/LogoffFooter";
import AgentInfo from "@/components/AgentInfo";
import SystemMap from "@/components/SystemMap";

export default function Home () {
  return (
      <>
        <div className='mainContainer'>
          <div className='hCenter'>
            <AgentInfo />
          </div>
          <div className='hCenter'>
            <div className="map"><SystemMap /></div>
          </div>
        </div>
        <LogoffFooter />
      </>

  )
}