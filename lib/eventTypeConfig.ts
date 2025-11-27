import { EventType } from '@prisma/client';

export interface EventTypeConfig {
  label: string;
  emoji: string;
  color: string;
  bgColor: string;
  description: string;
}

export const EVENT_TYPE_CONFIG: Record<EventType, EventTypeConfig> = {
  WEDDING: {
    label: 'Nuntă',
    emoji: '💍',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    description: 'Invitații elegante pentru ziua cea mare',
  },
  BAPTISM: {
    label: 'Botez',
    emoji: '👶',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    description: 'Invitații dulci pentru botezul copilului',
  },
  BIRTHDAY: {
    label: 'Zi de Naștere',
    emoji: '🎂',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    description: 'Invitații vesele pentru aniversare',
  },
  ANNIVERSARY: {
    label: 'Aniversare',
    emoji: '🎉',
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    description: 'Invitații memorabile pentru ani împreună',
  },
  CORPORATE: {
    label: 'Corporativ',
    emoji: '💼',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    description: 'Invitații profesionale pentru evenimente business',
  },
};

export function getEventTypeConfig(type: EventType): EventTypeConfig {
  return EVENT_TYPE_CONFIG[type];
}

export function getEventTypeLabel(type: EventType): string {
  return EVENT_TYPE_CONFIG[type].label;
}

export function getEventTypeEmoji(type: EventType): string {
  return EVENT_TYPE_CONFIG[type].emoji;
}
