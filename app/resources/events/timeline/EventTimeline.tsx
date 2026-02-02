"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin, Video, Users, Filter } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/app/components/ui/card'
import { Button } from '@/app/components/ui/button'
import { Badge } from '@/app/components/ui/badge'
import { cn } from '@/lib/utils'

type EventStatus = 'upcoming' | 'live' | 'archived'

interface Event {
  id: string
  title: string
  date: Date
  location: string
  status: EventStatus
  type: 'webinar' | 'conference' | 'workshop'
  attendees?: number
  recording?: string
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'SONiC Networking Workshop',
    date: new Date('2024-02-15'),
    location: 'Virtual',
    status: 'upcoming',
    type: 'workshop',
    attendees: 150
  },
  {
    id: '2',
    title: 'AI Infrastructure Summit',
    date: new Date('2024-01-20'),
    location: 'San Francisco, CA',
    status: 'live',
    type: 'conference',
    attendees: 500
  },
  {
    id: '3',
    title: 'Open Networking Webinar',
    date: new Date('2024-01-10'),
    location: 'Virtual',
    status: 'archived',
    type: 'webinar',
    recording: '/recordings/open-networking-2024'
  }
]

export function EventTimeline() {
  const [filter, setFilter] = useState<EventStatus | 'all'>('all')

  const filteredEvents = filter === 'all' 
    ? mockEvents 
    : mockEvents.filter(e => e.status === filter)

  const getStatusColor = (status: EventStatus) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-700'
      case 'live': return 'bg-green-100 text-green-700'
      case 'archived': return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'webinar': return Video
      case 'conference': return Users
      case 'workshop': return Calendar
      default: return Calendar
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Timeline</h1>
          <p className="text-gray-600">Explore our upcoming, live, and archived events</p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 mb-8">
          <Filter className="w-5 h-5 text-gray-500" />
          <div className="flex items-center gap-2">
            {(['all', 'upcoming', 'live', 'archived'] as const).map((status) => (
              <Button
                key={status}
                variant={filter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gray-200" />

          {/* Events */}
          <div className="space-y-8">
            {filteredEvents.map((event, index) => {
              const TypeIcon = getTypeIcon(event.type)
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative flex items-start gap-6"
                >
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0 w-16 h-16 bg-white rounded-full border-4 border-primary flex items-center justify-center">
                    <TypeIcon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Event Card */}
                  <Card className="flex-1">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="mb-2">{event.title}</CardTitle>
                          <div className="flex items-center gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {event.date.toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          </div>
                        </div>
                        <Badge className={getStatusColor(event.status)}>
                          {event.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {event.attendees && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Users className="w-4 h-4" />
                              {event.attendees} attendees
                            </div>
                          )}
                          {event.recording && (
                            <Button variant="link" size="sm">
                              <Video className="w-4 h-4 mr-1" />
                              Watch Recording
                            </Button>
                          )}
                        </div>
                        <Button variant="outline" size="sm">
                          {event.status === 'upcoming' ? 'RSVP' : 'View Details'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

