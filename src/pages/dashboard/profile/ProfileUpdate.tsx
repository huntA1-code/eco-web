
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const formSchema = z.object({
  firstName: z.string().max(30, {
    message: "First name must not be longer than 30 characters.",
  }),
  lastName: z.string().max(30, {
    message: "Last name must not be longer than 30 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().max(15, {
    message: "Phone number must not be longer than 15 characters.",
  }).regex(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, {
    message: "Please enter a valid phone number.",
  }),
})

export default function ProfileUpdate() {
  const [isSaving, setIsSaving] = useState(false)
  const navigate = useNavigate()
  
  // Mock user data - replace with actual API call
  const defaultValues = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1234567890"
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const { isDirty } = form.formState

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSaving(true)
      // Mock API call - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      toast.success("Profile updated successfully")
      form.reset(values)
    } catch (error) {
      toast.error("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 animate-fade-up">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Edit Profile</h1>
        <p className="text-muted-foreground">
          Update your personal information to keep your account secure.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your first name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter your last name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" disabled />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Enter your phone number" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center gap-4">
            <Button
              type="submit"
              disabled={!isDirty || isSaving}
              className="w-full sm:w-auto"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
