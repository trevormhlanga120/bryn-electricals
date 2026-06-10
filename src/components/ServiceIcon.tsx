import React from 'react';
import { 
  Wrench, 
  Cpu, 
  Gauge, 
  Zap, 
  Flame, 
  Shuffle, 
  Shield, 
  Radio, 
  Settings, 
  Battery,
  AlertTriangle,
  Activity,
  CheckCircle2,
  Lock,
  Music,
  ArrowRight
} from 'lucide-react';

interface ServiceIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function ServiceIcon({ name, className = "w-6 h-6", size }: ServiceIconProps) {
  const props = { className, size };
  
  switch (name) {
    case 'Wrench':
      return <Wrench {...props} />;
    case 'Cpu':
      return <Cpu {...props} />;
    case 'Gauge':
      return <Gauge {...props} />;
    case 'Zap':
      return <Zap {...props} />;
    case 'Flame':
      return <Flame {...props} />;
    case 'Shuffle':
      return <Shuffle {...props} />;
    case 'Shield':
      return <Shield {...props} />;
    case 'Radio':
      return <Radio {...props} />;
    case 'Settings':
      return <Settings {...props} />;
    case 'Battery':
      return <Battery {...props} />;
    case 'AlertTriangle':
      return <AlertTriangle {...props} />;
    case 'Activity':
      return <Activity {...props} />;
    case 'CheckCircle2':
      return <CheckCircle2 {...props} />;
    case 'Lock':
      return <Lock {...props} />;
    case 'Music':
      return <Music {...props} />;
    default:
      return <Settings {...props} />;
  }
}
export { ArrowRight, CheckCircle2 };
