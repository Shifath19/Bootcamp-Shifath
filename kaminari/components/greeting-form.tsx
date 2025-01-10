'use client'

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function GreetingForm() {
  const [username, setUsername] = useState("")
  const [greeting, setGreeting] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setGreeting(`Hello ${username}`)
  }

  const handleReset = () => {
    setUsername("")
    setGreeting("")
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Greeting Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <div className="flex gap-2">
            <Button type="submit" className="flex-1">Generate Greeting</Button>
            <Button type="button" variant="outline" onClick={handleReset} className="flex-1">Reset</Button>
          </div>
        </form>
        {greeting && (
          <Card className="mt-4">
            <CardContent className="pt-4">
              <p className="text-center text-lg font-medium">{greeting}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  )
}

